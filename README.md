# Mops

Selamat datang di **Mops**, sebuah website yang dibuat untuk mengumpulkan dan menyebarluaskan "mop" — istilah lokal Papua untuk cerita lucu, lelucon, atau kisah ringan dalam dialek Papua. Mop-mop ini adalah bagian penting dari budaya Papua, dan kami ingin melestarikannya agar dapat dinikmati semua orang, kapan saja, di mana saja.

Proyek ini diinisiasi oleh **Komunitas Papua Open Source**, yang berkomitmen berkontribusi bagi Tanah Papua melalui teknologi open source.

## Tech Stack

Mops dibangun menggunakan:

- **Astro**: Framework untuk website cepat dan efisien.
- **React**: Library JavaScript untuk membangun komponen UI interaktif.
- **TailwindCSS**: CSS framework untuk desain responsif.
- **shadcn/UI**: Komponen UI yang memudahkan kustomisasi.

## Public API

Data cerita mop tersedia secara publik melalui endpoint berikut:

### `GET /api/stories`

Mengembalikan semua cerita yang sudah dipublikasikan.

**Query parameter (opsional):**

| Parameter | Tipe   | Keterangan                    |
| --------- | ------ | ----------------------------- |
| `tag`     | string | Filter cerita berdasarkan tag |

**Contoh:**

```
GET https://ceritamop.com/api/stories
GET https://ceritamop.com/api/stories?tag=gereja
```

**Response:**

```json
{
  "total": 10,
  "data": [
    {
      "id": "vokal-grup",
      "title": "Vocal Grup",
      "date": "5 Februari 2026",
      "tags": ["gereja"],
      "content": [...]
    }
  ]
}
```

### `GET /api/stories/{id}`

Mengembalikan satu cerita berdasarkan ID.

**Contoh:**

```
GET https://ceritamop.com/api/stories/vokal-grup
```

**Response:**

```json
{
  "data": {
    "id": "vokal-grup",
    "title": "Vocal Grup",
    "date": "5 Februari 2026",
    "tags": ["gereja"],
    "content": [...]
  }
}
```

Jika ID tidak ditemukan, mengembalikan status `404` dengan body `{ "error": "Story not found" }`.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Cara Berkontribusi

Kami menyambut kontribusi! Untuk berkontribusi:

1. Fork repositori ini.
2. Buat branch baru (`git checkout -b fitur-anda`).
3. Commit perubahan (`git commit -m "Menambahkan fitur X"`).
4. Push ke branch Anda (`git push origin fitur-anda`).
5. Buat Pull Request.

> Lihat daftar _issue_ yang dapat dikerjakan [disini](https://github.com/papuaopensource/mops/issues)

## Kontak

Punya pertanyaan? Buka issue di repositori atau kunjungi [https://ceritamop.com](https://ceritamop.com).

Mari lestarikan budaya Papua melalui cerita dan tawa!
