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

Tambahkan entri baru ke array `mops` di [`src/lib/data.ts`](src/lib/data.ts):

```ts
{
  id: "id-unik-kebab-case",
  title: "Judul Cerita",
  date: "1 Januari 2026",      // format: D MMMM YYYY
  credit: "Nama Pengirim",     // opsional
  tags: [],
  content: [
    { type: "narration", content: "Narasi cerita..." },
    { type: "dialogue", speaker: "Nama", content: "Dialog..." },
  ],
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
├── layouts/      # Layout halaman
├── lib/
│   ├── data.ts   # Data cerita mop
│   └── utils.ts  # Helper functions
├── pages/        # Routing halaman
└── styles/       # CSS global
```


Ada pertanyaan? Buka [issue](https://github.com/papuaopensource/mops/issues) di GitHub.
