<div align="center">
  <h1>✨ CHESMA ✨</h1>
  <p><strong>Platform Dapur Pintar & Asisten Memasak AI</strong></p>

  <p>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /></a>
    <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" /></a>
    <a href="https://ai.google.dev/"><img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" /></a>
  </p>
</div>

<br />

> **CHESMA** adalah asisten cerdas yang dirancang untuk memecahkan masalah klasik "masak apa hari ini?". Kami mengubah cara Anda memasak dengan teknologi kecerdasan buatan—cukup foto bahan makanan di kulkas Anda, simpan di dapur digital (Pantry), dan biarkan AI kami menghasilkan resep lezat secara instan berdasarkan apa yang Anda miliki. *Cook smarter, not harder.*

---

## 🚀 Fitur Unggulan

📸 **Pemindai Bahan Makanan AI (Smart Scanner)**  
Tidak perlu mencatat secara manual. Cukup ambil atau unggah foto isi kulkas Anda, dan AI Vision kami (Google Gemini) akan mendeteksi dan mengekstrak daftar bahan makanan yang ada di dalamnya secara otomatis.

🥦 **Manajemen Dapur Digital (Smart Pantry)**  
Kelola stok bahan makanan Anda dengan antarmuka yang bersih dan elegan. Tambah, edit, dan pantau ketersediaan bahan-bahan Anda kapan saja.

🍳 **Generator Resep Otomatis (AI Recipes)**  
Berhenti membuang waktu mencari resep di internet. CHESMA menggunakan algoritma AI untuk meracik resep masakan selangkah demi selangkah yang disesuaikan secara khusus dengan bahan-bahan yang saat ini tersedia di Smart Pantry Anda.

⚡ **Pengalaman Pengguna yang Modern & Responsif**  
Dibangun menggunakan React dan Tailwind CSS untuk memberikan interaksi visual yang memukau, peringatan sukses (*alerts*) bergaya modern, serta navigasi super mulus.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Ikonografi**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database Engine**: SQLite (Zero-config)
- **Kecerdasan Buatan**: [Google Gemini API](https://ai.google.dev/) (@google/generative-ai)

---

## 📂 Struktur Direktori

`	ext
CHESMA/
├── FrontEnd/               # Antarmuka Pengguna (React + Vite)
│   ├── src/
│   │   ├── components/     # Komponen UI (Pantry, ScanPage, Recipes, Profile)
│   │   ├── App.tsx         # Routing Utama
│   │   └── main.tsx        # Entry point aplikasi
│   └── package.json
│
├── BackEnd/                # Logika Server & API (Node + Express)
│   ├── prisma/             # Schema Database & File SQLite (dev.db)
│   ├── src/
│   │   ├── controllers/    # Pengendali endpoint API
│   │   ├── services/       # Logika bisnis & integrasi AI
│   │   ├── model/          # Representasi data
│   │   ├── routes/         # Definisi routing API
│   │   └── main.ts         # Entry point server
│   └── package.json
`

---

## 💻 Panduan Instalasi & Pengembangan

Ikuti langkah-langkah di bawah ini untuk menjalankan CHESMA di mesin lokal Anda:

### 1. Clone Repositori
`ash
git clone https://github.com/akirausethis/CHESMA.git
cd CHESMA
`

### 2. Konfigurasi Backend & Database
Buka terminal baru untuk Backend:
`ash
cd BackEnd
npm install
`
Buat file .env di dalam folder BackEnd/ dan masukkan API Key Gemini Anda:
`env
DATABASE_URL="file:./dev.db"
API_KEY="masukkan_api_key_google_gemini_anda_disini"
`
Sinkronkan database SQLite dan jalankan server Backend:
`ash
npx prisma generate
npx prisma db push
npm run dev
`
*(Backend akan berjalan di http://localhost:3000)*

### 3. Jalankan Frontend
Buka terminal baru untuk Frontend:
`ash
cd FrontEnd
npm install
npm run dev
`
*(Frontend akan berjalan di http://localhost:5173)*

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk Mempermudah Aktivitas Memasak Anda.</p>
  <p><b>© 2026 CHESMA. Hak Cipta Dilindungi.</b></p>
</div>
