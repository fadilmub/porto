# Portfolio — Fadil Mubarok

Website portfolio personal statis untuk **Fadil Mubarok**, dibangun dengan
**HTML5, CSS3, dan JavaScript vanilla**. Tidak memerlukan backend, database,
maupun proses build.

## Struktur Folder

```
fadil-portfolio/
├── index.html      # Halaman utama
├── style.css       # Styling
├── script.js       # Interaksi & animasi
├── README.md       # Dokumentasi ini
└── assets/         # (Opsional) gambar, CV PDF, favicon, dll.
```

## Menjalankan Secara Lokal

### Cara 1 — Buka langsung
Klik dua kali `index.html` → otomatis terbuka di browser.

### Cara 2 — Server lokal (opsional)
Kalau ingin lebih stabil saat mengembangkan:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Lalu buka `http://localhost:8080`.

> ⚠️ Jangan buka lewat editor (VS Code live preview sudah oke). Jika tampilannya
> polos seperti HTML mentah, berarti `style.css` tidak termuat — cek nama file
> (jangan sampai `style.css.txt`) dan pastikan posisinya satu folder dengan
> `index.html`.

## Deployment

### GitHub Pages
1. Push folder ini ke repository GitHub.
2. Repo → **Settings** → **Pages**.
3. Source: **Deploy from a branch** → `main` / `root`.
4. Situs akan tersedia di `https://<username>.github.io/<repo>/`.

### Netlify
1. Buka [netlify.com](https://www.netlify.com) → **Add new site** → **Deploy manually**.
2. Seret folder `fadil-portfolio` ke area drop.
3. Selesai — Netlify akan memberi URL otomatis.

### Vercel
1. Buka [vercel.com](https://vercel.com) → **New Project** → **Import** dari Git.
2. Framework preset: **Other**. Build command: kosong. Output: root.
3. Deploy.

### Cloudflare Pages
1. Cloudflare Dashboard → **Pages** → **Create project**.
2. Hubungkan repo GitHub, atau upload langsung folder ini.
3. Build command kosong, output directory: `/`.

## Yang Perlu Dilengkapi Setelah Implementasi

Ganti placeholder berikut dengan data asli:

- [ ] **Email** — di `index.html`, cari `fadil.mubarok@example.com`
- [ ] **WhatsApp** — ganti `628xxxxxxxxxx` dan teks `+62 8xx-xxxx-xxxx`
- [ ] **GitHub** — ganti `https://github.com/username` dan teksnya
- [ ] **LinkedIn** — ganti `https://linkedin.com/in/username` dan teksnya
- [ ] **CV PDF** — simpan file di `assets/cv-fadil-mubarok.pdf`
- [ ] **Tautan dokumentasi proyek** — isi `href="#"` pada tiap kartu proyek
- [ ] **Tanggal mulai di QCNet** — di bagian Tentang & Timeline
- [ ] **Tanggal akhir di NajmyNet** — di bagian Timeline
- [ ] **Periode magang di CEO Point Networking** — di bagian Timeline
- [ ] **Rincian tugas QCNet** — tambahkan di timeline
- [ ] **Favicon** — taruh `assets/favicon.svg`, aktifkan baris `<link rel="icon">`
- [ ] **OG image** — taruh `assets/og-image.png` dan sesuaikan URL canonical
- [ ] **URL canonical & og:url** — ganti `https://example.com/` dengan domain asli

## Catatan

- Ilustrasi jaringan di hero adalah **SVG murni**, bukan screenshot asli.
- Semua klaim teknis ditulis apa adanya tanpa mengarang level skill atau hasil.
- Tidak ada IP publik, kredensial, atau data rahasia perusahaan/pelanggan.

## Lisensi

Bebas digunakan untuk keperluan personal Fadil Mubarok.