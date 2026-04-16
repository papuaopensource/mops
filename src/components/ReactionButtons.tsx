import { useState, useEffect } from "react";

const REACTIONS = [
  { key: "lucu", emoji: "😂", label: "Lucu" },
  { key: "bagus", emoji: "👍", label: "Bagus" },
  { key: "suka", emoji: "❤️", label: "Suka" },
  { key: "kaget", emoji: "😮", label: "Kaget" },
] as const;

type ReactionKey = (typeof REACTIONS)[number]["key"];

interface ReactionCounts {
  lucu: number;
  bagus: number;
  suka: number;
  kaget: number;
}

interface ReactionButtonsProps {
  mopId: string;
}

const USER_REACTION_KEY = (id: string) => `mop-user-reaction-${id}`;

function getUserReaction(mopId: string): ReactionKey | null {
  try {
    return localStorage.getItem(USER_REACTION_KEY(mopId)) as ReactionKey | null;
  } catch {
    return null;
  }
}

function setUserReaction(mopId: string, reaction: ReactionKey | null) {
  try {
    if (reaction === null) {
      localStorage.removeItem(USER_REACTION_KEY(mopId));
    } else {
      localStorage.setItem(USER_REACTION_KEY(mopId), reaction);
    }
  } catch {}
}

export default function ReactionButtons({ mopId }: ReactionButtonsProps) {
  const [counts, setCounts] = useState<ReactionCounts>({
    lucu: 0,
    bagus: 0,
    suka: 0,
    kaget: 0,
  });
  const [userReaction, setUserReactionState] = useState<ReactionKey | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setUserReactionState(getUserReaction(mopId));

    fetch(`/api/reactions/${mopId}/`)
      .then((r) => r.json())
      .then((data: ReactionCounts) => setCounts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mopId]);

  const handleReaction = async (key: ReactionKey) => {
    if (submitting) return;

    const previous = userReaction;
    const isRemoving = previous === key;
    const nextReaction = isRemoving ? null : key;

    // optimistic update
    setCounts((prev) => {
      const next = { ...prev };
      if (isRemoving) {
        next[key] = Math.max(0, next[key] - 1);
      } else {
        if (previous) next[previous] = Math.max(0, next[previous] - 1);
        next[key] += 1;
      }
      return next;
    });
    setUserReactionState(nextReaction);
    setUserReaction(mopId, nextReaction);

    setSubmitting(true);
    try {
      const res = await fetch(`/api/reactions/${mopId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction: key, previous }),
      });
      if (res.ok) {
        const updated: ReactionCounts = await res.json();
        setCounts(updated);
      }
    } catch {
      // revert on failure
      setCounts((prev) => {
        const next = { ...prev };
        if (isRemoving) {
          next[key] += 1;
        } else {
          if (previous) next[previous] += 1;
          next[key] = Math.max(0, next[key] - 1);
        }
        return next;
      });
      setUserReactionState(previous);
      setUserReaction(mopId, previous);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-sm font-medium">Reaksi kamu:</p>
      <div className="flex flex-wrap gap-2">
        {REACTIONS.map(({ key, emoji, label }) => {
          const active = userReaction === key;
          const count = counts[key];

          return (
            <button
              key={key}
              onClick={() => handleReaction(key)}
              disabled={loading || submitting}
              aria-label={`Reaksi ${label}${active ? " (aktif)" : ""}`}
              aria-pressed={active}
              className={[
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
                "hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
                active
                  ? "border-blue-400 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
              ].join(" ")}
            >
              <span className="text-base leading-none" aria-hidden="true">
                {emoji}
              </span>
              <span>{label}</span>
              {(count > 0 || loading) && (
                <span
                  className={[
                    "min-w-[1.25rem] rounded-full px-1 text-center text-xs font-semibold tabular-nums",
                    active
                      ? "bg-blue-200 text-blue-800"
                      : "bg-gray-100 text-gray-600",
                    loading ? "animate-pulse" : "",
                  ].join(" ")}
                >
                  {loading ? "·" : count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
