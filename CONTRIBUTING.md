# Contributing

Terima kasih atas minat Anda untuk berkontribusi pada Mops. Kontribusi dapat dilakukan melalui dua cara utama: mengirimkan cerita mop atau berkontribusi pada pengembangan kode.

## 1. Mengirim Cerita Mop

Memiliki cerita mop Papua yang ingin dibagikan? Anda dapat mengirimkannya melalui [Google Form](https://forms.gle/hB9peLVjARqvPuEJ7) tanpa perlu memiliki kemampuan pemrograman.

Setiap cerita yang masuk akan melalui proses kurasi sebelum dipublikasikan di situs.

## 2. Kontribusi Kode

### Prasyarat

* Node.js 18 atau lebih baru
* pnpm atau npm

### Setup

```bash
git clone https://github.com/papuaopensource/mops.git
cd mops
pnpm install
pnpm dev
```

Jika setelah menjalankan `pnpm install` muncul pesan berikut:

```text
ERR_PNPM_IGNORED_BUILDS
Ignored build scripts
```

Jalankan perintah berikut:

```bash
pnpm approve-builds
```

Kemudian:

1. Tekan `a` untuk memilih seluruh paket yang memerlukan persetujuan.
2. Tekan `Enter`.
3. Saat muncul konfirmasi `(y/N)`, pilih `y`.

### Menambahkan Cerita Melalui Kode

Tambahkan entri baru ke array pada file [`src/data/stories.json`](src/data/stories.json):

```json
{
  "id": "id-unik-kebab-case",
  "title": "Judul Cerita",
  "date": "1 Januari 2026",
  "credit": "Nama Pengirim",
  "tags": [],
  "content": [
    {
      "type": "narration",
      "content": "Narasi cerita..."
    },
    {
      "type": "dialogue",
      "speaker": "Nama",
      "content": "Dialog..."
    }
  ]
}
```

Catatan:

* Nilai `id` harus unik dan menggunakan format *kebab-case*.
* Cerita akan ditampilkan pada atau setelah tanggal yang ditentukan pada properti `date`.

### Alur Kerja Kontribusi

1. Fork repositori.

2. Buat branch baru:

   ```bash
   git checkout -b nama-branch
   ```

3. Lakukan perubahan yang diperlukan.

4. Jalankan formatter sebelum melakukan commit:

   ```bash
   pnpm run format
   ```

5. Commit dan push perubahan ke repositori fork Anda.

6. Buka Pull Request ke branch `master`.

### Struktur Proyek

```text
src/
├── components/       # Komponen Astro dan React
├── data/
│   └── stories.json  # Data cerita mop
├── layouts/          # Layout halaman
├── lib/
│   └── utils.ts      # Utility functions
├── pages/            # Routing halaman
├── styles/           # Global styles
└── types/
    └── index.d.ts    # Type definitions (Mop, Content)
```

## Bantuan

Jika memiliki pertanyaan, silakan buka issue di GitHub:

https://github.com/papuaopensource/mops/issues
