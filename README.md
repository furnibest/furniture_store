# Atiga Furniture Store - Unified App

Aplikasi terpadu untuk toko furniture Atiga Meubel yang menggabungkan frontend, admin panel, dan backend dengan database Prisma.

## Fitur Utama

- **Frontend**: Website toko furniture dengan tampilan modern dan responsif
- **Admin Panel**: Panel admin terintegrasi untuk mengelola produk, kategori, dan user
- **Backend API**: REST API dengan Express.js dan Prisma
- **Database**: MySQL dengan Prisma ORM

## Persyaratan Sistem

- Node.js v14+ dan npm
- MySQL 5.7+
- Git

## Cara Menggunakan

### 1. Clone Repository

```bash
git clone <repository-url>
cd furniture-store/unified-app
```

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Konfigurasi Database

Buat file `.env` di root folder dengan konfigurasi berikut:

```
DATABASE_URL="mysql://username:password@localhost:3306/atiga_mebel"
PORT=5001
```

Ganti `username` dan `password` dengan kredensial MySQL Anda.

### 4. Migrasi Database

```bash
npm run prisma:migrate
```

### 5. Generate Prisma Client

```bash
npm run prisma:generate
```

### 6. Jalankan Aplikasi

Untuk development (server dan client secara bersamaan):

```bash
npm run dev
```

Untuk production:

```bash
npm run build
npm start
```

## Deployment ke Vercel

Aplikasi ini sudah dikonfigurasi untuk deployment ke Vercel dengan backend dan frontend dalam satu project.

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Setup di Vercel

1. Buat akun di [Vercel](https://vercel.com) jika belum memiliki
2. Klik "New Project" dan import repository GitHub Anda
3. Konfigurasi environment variables:
   - `DATABASE_URL`: URL database MySQL Anda (gunakan PlanetScale, Railway, atau layanan MySQL lainnya)
   - `NODE_ENV`: `production`
4. Klik "Deploy"

### 3. Konfigurasi Database

Untuk production, gunakan layanan database MySQL seperti:
- [PlanetScale](https://planetscale.com) (Rekomendasi, ada tier gratis)
- [Railway](https://railway.app)
- [AWS RDS](https://aws.amazon.com/rds/)

Setelah membuat database, jalankan migrasi:

```bash
npx prisma migrate deploy
```

### Catatan Penting untuk Deployment

- File upload akan disimpan di `/tmp/uploads` di Vercel (penyimpanan sementara)
- Untuk penyimpanan file permanen, gunakan layanan seperti AWS S3, Cloudinary, atau Firebase Storage
- Vercel memiliki batasan ukuran deployment, pastikan tidak melebihi batas

## Struktur Folder

```
unified-app/
├── prisma/              # Schema dan migrasi Prisma
├── src/
│   ├── client/          # Frontend React
│   │   ├── public/      # Asset statis
│   │   └── src/         # Kode sumber React
│   └── server/          # Backend Express
│       ├── routes/      # Route API
│       └── uploads/     # Folder upload gambar
├── .env                 # Variabel lingkungan
├── vercel.json          # Konfigurasi Vercel
└── package.json         # Dependensi dan script
```

## API Endpoints

### Produk

- `GET /api/products` - Mendapatkan semua produk
- `GET /api/products/:id` - Mendapatkan produk berdasarkan ID
- `POST /api/products` - Menambah produk baru (dengan upload gambar)
- `PUT /api/products/:id` - Memperbarui produk (dengan upload gambar)
- `DELETE /api/products/:id` - Menghapus produk

## Akses Admin Panel

Admin panel dapat diakses di `/admin` dengan kredensial default:

- Username: admin
- Password: admin123

## Kontribusi

Silakan buat pull request untuk kontribusi atau perbaikan.

## Lisensi

[MIT](LICENSE) 