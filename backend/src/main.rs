mod database;

use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use serde::Deserialize;
use std::sync::Mutex;
use rusqlite::Connection;
use crate::database::{init_db, Package, Setting};

struct AppState {
    db: Mutex<Connection>,
}

#[derive(Deserialize)]
struct ContactForm {
    name: String,
    phone: String,
    address: String,
    package: String,
}

#[derive(Deserialize)]
struct RegistrationForm {
    name: String,
    phone: String,
    address: String,
    package: String,
    notes: String,
}

async fn contact_message(form: web::Json<ContactForm>) -> impl Responder {
    println!("Menerima Data Pendaftaran Baru:");
    println!("-------------------------------------------------");
    println!("Nama    : {}", form.name);
    println!("Telepon : {}", form.phone);
    println!("Alamat  : {}", form.address);
    println!("Paket   : {}", form.package);
    println!("-------------------------------------------------");

    HttpResponse::Ok().json(serde_json::json!({
        "message": "Pendaftaran berhasil diterima! Tim kami akan segera menghubungi Anda."
    }))
}

async fn get_settings(data: web::Data<AppState>) -> impl Responder {
    let conn = data.db.lock().unwrap();
    let mut stmt = conn.prepare("SELECT key, value FROM settings").unwrap();
    let settings_iter = stmt.query_map([], |row| {
        Ok(Setting {
            key: row.get(0)?,
            value: row.get(1)?,
        })
    }).unwrap();

    let settings: Vec<Setting> = settings_iter.map(|s| s.unwrap()).collect();
    HttpResponse::Ok().json(settings)
}

async fn update_setting(data: web::Data<AppState>, setting: web::Json<Setting>) -> impl Responder {
    let conn = data.db.lock().unwrap();
    conn.execute(
        "INSERT OR REPLACE INTO settings (key, value) VALUES (?1, ?2)",
        rusqlite::params![setting.key, setting.value],
    ).unwrap();
    HttpResponse::Ok().json(serde_json::json!({"message": "Setting updated"}))
}

async fn get_packages(data: web::Data<AppState>) -> impl Responder {
    let conn = data.db.lock().unwrap();
    let mut stmt = conn.prepare("SELECT id, name, speed, price, features FROM packages").unwrap();
    let packages_iter = stmt.query_map([], |row| {
        Ok(Package {
            id: row.get(0)?,
            name: row.get(1)?,
            speed: row.get(2)?,
            price: row.get(3)?,
            features: serde_json::from_str(&row.get::<_, String>(4)?).unwrap_or_default(),
        })
    }).unwrap();

    let packages: Vec<Package> = packages_iter.map(|p| p.unwrap()).collect();
    HttpResponse::Ok().json(packages)
}

async fn save_package(data: web::Data<AppState>, pkg: web::Json<Package>) -> impl Responder {
     let conn = data.db.lock().unwrap();
     let features_json = serde_json::to_string(&pkg.features).unwrap();

     if let Some(id) = pkg.id {
          conn.execute(
               "UPDATE packages SET name=?1, speed=?2, price=?3, features=?4 WHERE id=?5",
               rusqlite::params![pkg.name, pkg.speed, pkg.price, features_json, id],
          ).unwrap();
     } else {
          conn.execute(
               "INSERT INTO packages (name, speed, price, features) VALUES (?1, ?2, ?3, ?4)",
               rusqlite::params![pkg.name, pkg.speed, pkg.price, features_json],
          ).unwrap();
     }
     HttpResponse::Ok().json(serde_json::json!({"message": "Package saved"}))
}

async fn delete_package(data: web::Data<AppState>, path: web::Path<i32>) -> impl Responder {
     let id = path.into_inner();
     let conn = data.db.lock().unwrap();
     conn.execute("DELETE FROM packages WHERE id=?1", rusqlite::params![id]).unwrap();
     HttpResponse::Ok().json(serde_json::json!({"message": "Package deleted"}))
}

async fn save_registration(data: web::Data<AppState>, form: web::Json<RegistrationForm>) -> impl Responder {
    let conn = data.db.lock().unwrap();
    conn.execute(
        "INSERT INTO registrations (name, phone, address, package, notes, created_at) VALUES (?1, ?2, ?3, ?4, ?5, datetime('now'))",
        rusqlite::params![form.name, form.phone, form.address, form.package, form.notes],
    ).unwrap();
    
    println!("Pendaftaran Baru:");
    println!("Nama: {}, HP: {}, Paket: {}", form.name, form.phone, form.package);
    
    HttpResponse::Ok().json(serde_json::json!({"message": "Registration saved"}))
}

async fn get_registrations(data: web::Data<AppState>) -> impl Responder {
    let conn = data.db.lock().unwrap();
    let mut stmt = conn.prepare("SELECT id, name, phone, address, package, notes, created_at FROM registrations ORDER BY created_at DESC").unwrap();
    let registrations_iter = stmt.query_map([], |row| {
        Ok(serde_json::json!({
            "id": row.get::<_, i32>(0)?,
            "name": row.get::<_, String>(1)?,
            "phone": row.get::<_, String>(2)?,
            "address": row.get::<_, String>(3)?,
            "package": row.get::<_, String>(4)?,
            "notes": row.get::<_, String>(5)?,
            "created_at": row.get::<_, String>(6)?,
        }))
    }).unwrap();

    let registrations: Vec<_> = registrations_iter.map(|r| r.unwrap()).collect();
    HttpResponse::Ok().json(registrations)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let conn = init_db().expect("Failed to initialize database");
    let app_state = web::Data::new(AppState {
        db: Mutex::new(conn),
    });

    println!("Server ISP berjalan di http://localhost:9000");

    HttpServer::new(move || {
        App::new()
            .wrap(Cors::permissive())
            .app_data(app_state.clone())
            .route("/api/contact", web::post().to(contact_message))
            .route("/api/settings", web::get().to(get_settings))
            .route("/api/settings", web::post().to(update_setting))
            .route("/api/packages", web::get().to(get_packages))
            .route("/api/packages", web::post().to(save_package))
            .route("/api/packages/{id}", web::delete().to(delete_package))
            .route("/api/registrations", web::post().to(save_registration))
            .route("/api/registrations", web::get().to(get_registrations))
    })
    .bind("127.0.0.1:9000")?
    .run()
    .await
}
