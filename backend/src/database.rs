use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Package {
    pub id: Option<i32>,
    pub name: String,
    pub speed: String,
    pub price: String,
    pub features: Vec<String>, // Stored as JSON string in DB
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Setting {
    pub key: String,
    pub value: String,
}

pub fn init_db() -> Result<Connection> {
    let conn = Connection::open("unnet.db")?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS packages (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            speed TEXT NOT NULL,
            price TEXT NOT NULL,
            features TEXT NOT NULL
        )",
        [],
    )?;

    // Seed default settings using INSERT OR IGNORE to add missing keys without overwriting existing ones
    let default_settings = vec![
        ("site_title", "UNNET"),
        ("whatsapp_number", "6285233053443"),
        ("address", "Jawa Timur & Sekitarnya"),
        ("email", "info@unnet.id"),
        ("work_hours", "Senin - Sabtu: 08:00 - 20:00"),
        ("tagline", "Teknisi Cepat Tanggap"),
        ("map_embed_url", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.8!2d111.7626166!3d-7.2648367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79d5e75d766211%3A0x2c8b3ef233d2ef5a!2sUNNET%20WIFI%20cepat%20tanggap%20teknisinya!5e0!3m2!1sen!2sid!4v1234567890"),
        ("map_direct_url", "https://www.google.com/maps/place/UNNET+WIFI+cepat+tanggap+teknisinya/@-7.2648314,111.7600417,1078m/data=!3m1!1e3!4m8!3m7!1s0x2e79d5e75d766211:0x2c8b3ef233d2ef5a!8m2!3d-7.2648367!4d111.7626166!9m1!1b1!16s%2Fg%2F11smmhxn1f"),
    ];

    for (key, value) in default_settings {
        conn.execute(
            "INSERT OR IGNORE INTO settings (key, value) VALUES (?1, ?2)",
            params![key, value],
        )?;
    }

    // Seed default packages if empty
    let pkg_count: i32 = conn.query_row("SELECT count(*) FROM packages", [], |row| row.get(0))?;
    if pkg_count == 0 {
        let default_packages = vec![
            ("Starter", "30 Mbps", "Rp 150rb/bulan", "[\"Ideal untuk 1-3 perangkat\", \"Streaming HD lancar\", \"Bebas FUP\"]"),
            ("Standard", "100 Mbps", "Rp 250rb/bulan", "[\"Ideal untuk 4-7 perangkat\", \"Streaming 4K lancar\", \"Gaming rendah latensi\"]"),
            ("Premium", "300 Mbps", "Rp 450rb/bulan", "[\"Ideal untuk Smart Home\", \"Upload file besar cepat\", \"Prioritas Bandwidth\"]"),
            ("Business", "1 Gbps", "Rp 850rb/bulan", "[\"Koneksi Bisnis/Kantor\", \"IP Public Static\", \"Support Prioritas\"]"),
        ];

        for pkg in default_packages {
            conn.execute(
                "INSERT INTO packages (name, speed, price, features) VALUES (?1, ?2, ?3, ?4)",
                params![pkg.0, pkg.1, pkg.2, pkg.3],
            )?;
        }
    }

    Ok(conn)
}
