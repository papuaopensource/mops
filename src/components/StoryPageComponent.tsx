// StoryPageComponent.tsx
import { useState, useEffect, useMemo } from "react";
import { ChevronRight, Search, X, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseDate } from "@/lib/utils";
import type { Mop } from "@/lib/data";

// Fungsi untuk mendapatkan bulan dan tahun dari string tanggal
function getMonthYear(dateString: string) {
  const parts = dateString.split(" ");
  if (parts.length >= 2) {
    return `${parts[1]} ${parts[2]}`;
  }
  return dateString;
}

// Fungsi untuk mengelompokkan mops berdasarkan bulan
function groupMopsByMonth(mops: Mop[]) {
  const grouped: Record<string, Mop[]> = {};

  mops.forEach((mop) => {
    const monthYear = getMonthYear(mop.date);
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(mop);
  });

  // Urutkan berdasarkan tanggal (terbaru dulu)
  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  });

  return grouped;
}

interface CeritaPageComponentProps {
  availableMops: Mop[];
  allMonths: string[];
}

export default function CeritaPageComponent({
  availableMops,
  allMonths,
}: CeritaPageComponentProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  // Mendapatkan semua tag unik dari data mops yang tersedia
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    availableMops.forEach((mop) => {
      mop.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [availableMops]);

  // Filter mops berdasarkan pencarian, bulan, dan tag yang dipilih
  const filteredMops = useMemo(() => {
    let result = [...availableMops];

    // Filter berdasarkan pencarian
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (mop) =>
          mop.title.toLowerCase().includes(searchLower) ||
          mop.content.some(
            (item) =>
              item.content && item.content.toLowerCase().includes(searchLower)
          )
      );
    }

    // Filter berdasarkan bulan
    if (selectedMonth !== "all") {
      result = result.filter((mop) => getMonthYear(mop.date) === selectedMonth);
    }

    // Filter berdasarkan tag
    if (selectedTag !== "all") {
      result = result.filter((mop) => mop.tags?.includes(selectedTag));
    }

    return result;
  }, [searchTerm, selectedMonth, selectedTag, availableMops]);

  // Mengelompokkan mops berdasarkan bulan
  const groupedMops = useMemo(
    () => groupMopsByMonth(filteredMops),
    [filteredMops]
  );

  // Mengurutkan group bulan dari yang terbaru
  const monthGroups = useMemo(() => {
    return Object.keys(groupedMops).sort((a, b) => {
      // Mengonversi "Bulan Tahun" menjadi objek Date untuk perbandingan
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");

      // Membandingkan tahun terlebih dahulu
      if (yearA !== yearB) {
        return parseInt(yearB) - parseInt(yearA);
      }

      // Jika tahun sama, bandingkan bulan
      const monthsOrder: Record<string, number> = {
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
      };

      return monthsOrder[monthB] - monthsOrder[monthA];
    });
  }, [groupedMops]);

  // Menghitung mops yang akan ditampilkan berdasarkan visibleCount
  const visibleMops = useMemo(() => {
    let totalMopsToShow = 0;
    const result: { month: string; mops: Mop[] }[] = [];

    for (const month of monthGroups) {
      const monthMops = groupedMops[month];
      const mopsToTake = Math.min(
        monthMops.length,
        Math.max(0, visibleCount - totalMopsToShow)
      );

      if (mopsToTake > 0) {
        result.push({
          month,
          mops: monthMops.slice(0, mopsToTake),
        });
        totalMopsToShow += mopsToTake;
      }

      if (totalMopsToShow >= visibleCount) break;
    }

    return result;
  }, [groupedMops, monthGroups, visibleCount]);

  // Reset pagination ketika filter berubah
  useEffect(() => {
    setVisibleCount(5);
  }, [searchTerm, selectedMonth, selectedTag]);

  // Menghitung total mops yang tersedia
  const totalMops = filteredMops.length;

  // Handler untuk tombol "Load More"
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, totalMops));
  };

  // Handler untuk reset pencarian
  const handleResetSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <div className="mb-8 space-y-4">
        {/* Search and filter row */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Cari cerita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 pl-10"
            />
            {searchTerm && (
              <button
                onClick={handleResetSearch}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {/* Tag filter */}
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Tag className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Pilih tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tag</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Month filter */}
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Pilih bulan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Bulan</SelectItem>
                {allMonths.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results info */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredMops.length === 0
            ? "Tidak ada cerita yang ditemukan"
            : `Menampilkan ${Math.min(visibleCount, totalMops)} dari ${totalMops} cerita`}
        </div>
      </div>

      {filteredMops.length > 0 ? (
        <div className="space-y-8">
          {visibleMops.map((group) => (
            <div key={group.month} className="space-y-4">
              <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
                {group.month}
              </h2>

              <div className="space-y-4 border-l-2 border-gray-200 pl-4 dark:border-gray-700">
                {group.mops.map((mop) => (
                  <div key={mop.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <a href={`/cerita/${mop.id}/`} className="group block">
                      <div className="mb-2 flex flex-wrap gap-2">
                        {mop.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full px-2 py-0.5 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="mb-1 text-lg font-medium group-hover:text-blue-600">
                        {mop.title}
                      </h3>
                      <p className="text-muted-foreground mb-2 text-sm">
                        {mop.date}
                      </p>
                      <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                        {mop.content[0]?.content || ""}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Tidak ada cerita yang sesuai dengan kriteria pencarian Anda.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedMonth("all");
              setSelectedTag("all");
            }}
            className="mt-4"
          >
            Reset Filter
          </Button>
        </div>
      )}

      {visibleCount < totalMops && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="flex items-center gap-2"
          >
            Muat Lebih Banyak
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
