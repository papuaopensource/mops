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

function getMonthYear(dateString: string) {
  const parts = dateString.split(" ");
  if (parts.length >= 2) {
    return `${parts[1]} ${parts[2]}`;
  }
  return dateString;
}

function groupMopsByMonth(mops: Mop[]) {
  const grouped: Record<string, Mop[]> = {};

  mops.forEach((mop) => {
    const monthYear = getMonthYear(mop.date);
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(mop);
  });

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

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    availableMops.forEach((mop) => {
      mop.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [availableMops]);

  const filteredMops = useMemo(() => {
    let result = [...availableMops];

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

    if (selectedMonth !== "all") {
      result = result.filter((mop) => getMonthYear(mop.date) === selectedMonth);
    }

    if (selectedTag !== "all") {
      result = result.filter((mop) => mop.tags?.includes(selectedTag));
    }

    return result;
  }, [searchTerm, selectedMonth, selectedTag, availableMops]);

  const groupedMops = useMemo(
    () => groupMopsByMonth(filteredMops),
    [filteredMops]
  );

  const monthGroups = useMemo(() => {
    return Object.keys(groupedMops).sort((a, b) => {
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");

      if (yearA !== yearB) {
        return parseInt(yearB) - parseInt(yearA);
      }

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

  useEffect(() => {
    setVisibleCount(5);
  }, [searchTerm, selectedMonth, selectedTag]);

  const totalMops = filteredMops.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, totalMops));
  };

  const handleResetSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <div className="mb-8 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
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
                className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full sm:w-[140px]">
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

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full sm:w-[140px]">
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

        <div className="text-xs text-neutral-500">
          {filteredMops.length === 0
            ? "Tidak ada cerita yang ditemukan"
            : `Menampilkan ${Math.min(visibleCount, totalMops)} dari ${totalMops} cerita`}
        </div>
      </div>

      {filteredMops.length > 0 ? (
        <div className="space-y-8">
          {visibleMops.map((group) => (
            <div key={group.month} className="space-y-3">
              <h2 className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                {group.month}
              </h2>

              <div className="space-y-3 border-l border-neutral-800 pl-4">
                {group.mops.map((mop) => (
                  <div key={mop.id} className="border-b border-neutral-800 pb-4 last:border-0 last:pb-0">
                    <a href={`/cerita/${mop.id}/`} className="group block">
                      {mop.tags && mop.tags.length > 0 && (
                        <div className="mb-1.5 flex flex-wrap gap-1.5">
                          {mop.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-neutral-700 px-1.5 py-0.5 text-xs text-neutral-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h3 className="mb-1 text-sm font-medium text-neutral-200 group-hover:text-neutral-100 transition-colors">
                        {mop.title}
                      </h3>
                      <p className="mb-1 text-xs text-neutral-600">
                        {mop.date}
                      </p>
                      <p className="line-clamp-2 text-xs text-neutral-500">
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
        <div className="rounded border border-dashed border-neutral-800 p-8 text-center">
          <p className="text-sm text-neutral-500">
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
