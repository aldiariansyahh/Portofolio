# 🎓 Portofolio – Muhamad Rifaldi Aryansyah
D3 Teknik Elektronika · Politeknik Negeri Semarang (Polines)

---

## 📁 Struktur Folder

```
portfolio/
├── index.html              ← Halaman utama
├── data.json               ← Edit ini untuk update konten
├── css/style.css           ← Tampilan (warna, font, layout)
├── js/main.js              ← Logika rendering
├── images/
│   ├── foto.jpg            ← ⚠️ Tambahkan foto kamu di sini
│   ├── project1.jpg        ← Gambar Smart Door Lock
│   ├── project2.jpg        ← Gambar Food Dehydration
│   └── project3.jpg        ← Gambar Water Level Monitoring
└── assets/
    └── CV_Rifaldi.pdf      ← ✅ CV sudah tersedia
```

---

## 🚀 Cara Menjalankan

### Opsi 1 – Python (paling mudah)
```bash
cd portfolio
python -m http.server 8000
```
Buka: http://localhost:8000

### Opsi 2 – Node.js
```bash
npx serve .
```

### Opsi 3 – VS Code
Install ekstensi **Live Server**, klik kanan `index.html` → **Open with Live Server**

---

## ✏️ Yang Perlu Dilengkapi

1. **Foto profil** → simpan sebagai `images/foto.jpg`
2. **Gambar proyek** → simpan sebagai `images/project1.jpg`, `project2.jpg`, `project3.jpg`
3. **GitHub username** → edit di `index.html` (cari `aldiaryansyah`)
4. **LinkedIn** → edit di `index.html` footer jika ada

---

## 🌐 Deploy Gratis

| Platform | Cara |
|---|---|
| GitHub Pages | Push ke repo → Settings → Pages → Deploy |
| Netlify | Drag & drop folder ke netlify.com/drop |
| Vercel | `npx vercel` di terminal |
