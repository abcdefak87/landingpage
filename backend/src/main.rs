use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use serde::Serialize;
use std::sync::Mutex;

#[derive(Serialize)]
struct ProfileResponse {
    name: String,
    title: String,
    bio: String,
    skills: Vec<String>,
    social_links: Vec<SocialLink>,
}

#[derive(Serialize)]
struct SocialLink {
    platform: String,
    url: String,
    icon: String,
}

struct AppState {
    profile: Mutex<ProfileResponse>,
}

async fn get_profile(data: web::Data<AppState>) -> impl Responder {
    let profile = data.profile.lock().unwrap();
    HttpResponse::Ok().json(&*profile)
}

async fn contact_message() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "message": "Message sent successfully!"
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let app_state = web::Data::new(AppState {
        profile: Mutex::new(ProfileResponse {
            name: "John Doe".to_string(),
            title: "Full Stack Developer".to_string(),
            bio: "Passionate developer crafting beautiful digital experiences with modern technologies.".to_string(),
            skills: vec!["Rust", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker"].into_iter().map(|s| s.to_string()).collect(),
            social_links: vec![
                SocialLink { platform: "GitHub".to_string(), url: "https://github.com".to_string(), icon: "github".to_string() },
                SocialLink { platform: "LinkedIn".to_string(), url: "https://linkedin.com".to_string(), icon: "linkedin".to_string() },
                SocialLink { platform: "Twitter".to_string(), url: "https://twitter.com".to_string(), icon: "twitter".to_string() },
            ],
        }),
    });

    println!("Server running on http://localhost:9000");

    HttpServer::new(move || {
        App::new()
            .wrap(Cors::permissive())
            .app_data(app_state.clone())
            .route("/api/profile", web::get().to(get_profile))
            .route("/api/contact", web::post().to(contact_message))
    })
    .bind("127.0.0.1:9000")?
    .run()
    .await
}
