# Contributing

Terima kasih sudah ingin berkontribusi! Ada dua cara utama berkontribusi ke Mops.

## 1. Kirim Cerita Mop

Punya cerita mop Papua? Kirim lewat [Google Form](https://forms.gle/hB9peLVjARqvPuEJ7) — tidak perlu tahu coding.

Cerita yang masuk akan dikurasi sebelum ditampilkan di situs.

## 2. Kontribusi Kode

### Prasyarat

- Node.js 18+
- pnpm atau npm

### Setup

```bash
git clone https://github.com/papuaopensource/mops.git
cd mops
pnpm install
pnpm dev
```

### Menambah Cerita Lewat Kode

Tambahkan entri baru ke array di [`src/data/stories.json`](src/data/stories.json):

```json
{
  "id": "id-unik-kebab-case",
  "title": "Judul Cerita",
  "date": "1 Januari 2026",
  "credit": "Nama Pengirim",
  "tags": [],
  "content": [
    { "type": "narration", "content": "Narasi cerita..." },
    { "type": "dialogue", "speaker": "Nama", "content": "Dialog..." }
  ]
}
```

Cerita hanya tampil pada atau setelah tanggal `date` yang ditentukan.

### Alur Kerja

1. Fork repositori
2. Buat branch baru: `git checkout -b nama-branch`
3. Buat perubahan, jalankan `pnpm run format` sebelum commit
4. Push dan buka Pull Request ke branch `master`

### Struktur Proyek

```
src/
├── components/   # Komponen Astro & React
├── data/
│   └── stories.json  # Data cerita mop
├── layouts/      # Layout halaman
├── lib/
│   └── utils.ts  # Helper functions
├── pages/        # Routing halaman
├── styles/       # CSS global
└── types/
    └── index.d.ts    # Type definitions (Mop, Content)
```


Ada pertanyaan? Buka [issue](https://github.com/papuaopensource/mops/issues) di GitHub.
