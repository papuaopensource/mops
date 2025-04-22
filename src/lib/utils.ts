import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fungsi untuk mengubah string tanggal menjadi objek Date dengan zona waktu lokal
export function parseDate(dateString: string) {
  const parts = dateString.split(" ")
  if (parts.length >= 3) {
    const day = Number.parseInt(parts[0])
    const month = getMonthNumber(parts[1])
    const year = Number.parseInt(parts[2])

    // Buat tanggal dengan zona waktu lokal
    // Perhatikan: Ini menggunakan zona waktu klien secara otomatis
    return new Date(year, month, day)
  }

  // Fallback ke tanggal saat ini dalam zona waktu lokal
  return new Date()
}

// Fungsi untuk mendapatkan nomor bulan dari nama bulan
function getMonthNumber(monthName: string) {
  const months: Record<string, number> = {
    Januari: 0,
    Februari: 1,
    Maret: 2,
    April: 3,
    Mei: 4,
    Juni: 5,
    Juli: 6,
    Agustus: 7,
    September: 8,
    Oktober: 9,
    November: 10,
    Desember: 11,
  }
  return months[monthName] || 0
}

// Fungsi untuk memfilter mops berdasarkan tanggal saat ini
export function filterMopsByDate(mops: any[]) {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset waktu ke 00:00:00

  return mops.filter((mop) => {
    const mopDate = parseDate(mop.date)
    return mopDate <= today
  })
}

// Fungsi untuk mendapatkan mop hari ini
export function getTodayMop(mops: any[]) {
  const availableMops = filterMopsByDate(mops)

  if (availableMops.length === 0) return null

  // Urutkan mops berdasarkan tanggal (terbaru dulu)
  const sortedMops = [...availableMops].sort((a, b) => {
    const dateA = parseDate(a.date)
    const dateB = parseDate(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return sortedMops[0] // Ambil mop dengan tanggal terbaru
}

// Fungsi untuk membuat slug dari judul
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Ganti spasi dengan tanda hubung
    .replace(/[^\w-]+/g, "") // Hapus karakter non-word
    .replace(/--+/g, "-") // Ganti multiple hyphens dengan satu hyphen
    .replace(/^-+/, "") // Trim tanda hubung dari awal
    .replace(/-+$/, "") // Trim tanda hubung dari akhir
    .slice(0, 50) // Batasi panjang slug
}