# Baltun.net Landing Page

Landing page modern untuk Baltun.net - Penyedia layanan internet WiFi di Jawa Timur dengan animasi Three.js interaktif.

## ✨ Fitur

- 🎨 **Three.js Interactive Background** - Animasi 3D dengan partikel, nebula, dan ikon WiFi yang responsif terhadap gerakan mouse
- 🌓 **Dark/Light Mode** - Toggle tema dengan transisi smooth
- 📱 **Fully Responsive** - Optimized untuk desktop dan mobile
- 💬 **WhatsApp Integration** - Tombol floating dan link langsung ke WhatsApp
- 🗺️ **Google Maps** - Lokasi kantor terintegrasi
- ⚡ **Fast Performance** - Built dengan Vite untuk loading cepat
- 🎯 **Modern UI/UX** - Glass morphism, gradients, dan animasi halus

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Three.js** - 3D graphics & animations
- **@react-three/fiber** - React renderer untuk Three.js
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Rust** - High-performance backend
- **Actix-web** - Web framework

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ dan npm
- Rust 1.70+ (untuk backend)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### Backend Setup

```bash
cd backend
cargo run
```

Backend akan berjalan di `http://localhost:8080`

## 📦 Build untuk Production

### Frontend
```bash
cd frontend
npm run build
```

Output akan ada di folder `frontend/dist/`

### Backend
```bash
cd backend
cargo build --release
```

Binary akan ada di `backend/target/release/`

## 🐳 Deploy dengan Docker

### Prerequisites
- Docker
- Docker Compose

### Jalankan dengan Docker Compose

```bash
# Build dan jalankan semua service
docker-compose up -d --build

# Lihat logs
docker-compose logs -f

# Stop service
docker-compose down
```

Setelah berjalan:
- **Frontend**: http://localhost (port 80)
- **Backend API**: http://localhost:9000

### Build Manual

```bash
# Build backend
docker build -t baltun-backend ./backend

# Build frontend
docker build -t baltun-frontend ./frontend

# Jalankan backend
docker run -d -p 9000:9000 --name baltun-backend baltun-backend

# Jalankan frontend
docker run -d -p 80:80 --name baltun-frontend baltun-frontend
```

## 📞 Kontak

- **WhatsApp**: 085233053443
- **Lokasi**: Jawa Timur
- **Google Maps**: [Baltun.net WIFI](https://www.google.com/maps/place/UNNET+WIFI+cepat+tanggap+teknisinya/@-7.2648367,111.7626166)

## 📄 License

© 2026 Baltun.net. Hak cipta dilindungi.
