# QR Code Generator — Tanpa Library

Proyek sederhana untuk membuat QR Code hanya dengan **HTML, CSS, dan JavaScript murni** tanpa library tambahan. QR Code dihasilkan melalui API gratis dari [QRServer](https://goqr.me/api/).

## 📂 Struktur Folder

```
qr-code-generator/
├── index.html # Halaman utama
├── style.css # File CSS untuk styling
├── script.js # File JavaScript untuk logika QR code
└── README.md # Dokumentasi proyek
```

## 🚀 Cara Menjalankan

1. Clone atau download repo ini.
2. Pastikan semua file (`index.html`, `style.css`, `script.js`) berada dalam satu folder.
3. Buka `index.html` di browser favorit kamu (Chrome, Edge, Firefox, dll).
4. Masukkan teks atau URL ke input, lalu klik tombol **Generate**.

## ✨ Fitur

- Input teks/URL bebas.
- Pilihan ukuran QR (120px – 1000px).
- Pilihan level error correction (L, M, Q, H).
- Pilihan margin (quiet zone).
- Preview QR langsung dalam halaman.
- Download hasil QR sebagai PNG.
- Copy URL gambar QR ke clipboard.
- Tombol clear untuk reset input.

## 🎨 Tampilan

- Tema gelap dengan gradient background.
- Desain responsive (bisa dipakai di layar HP).

## ⚙️ Catatan

- Proyek ini **tanpa library** eksternal (misalnya `qrcode.js`).
- QR code dihasilkan melalui **API QRServer**, jadi butuh koneksi internet.
