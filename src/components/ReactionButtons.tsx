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
      <p className="text-xs uppercase tracking-wide text-neutral-500">Reaksi kamu</p>
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
                "flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-medium transition-colors",
                "hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
                active
                  ? "border-neutral-400 bg-neutral-700 text-neutral-100"
                  : "border-neutral-800 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200",
              ].join(" ")}
            >
              <span className="text-sm leading-none" aria-hidden="true">
                {emoji}
              </span>
              <span>{label}</span>
              {(count > 0 || loading) && (
                <span
                  className={[
                    "min-w-[1.25rem] rounded px-1 text-center text-xs tabular-nums",
                    active
                      ? "bg-neutral-600 text-neutral-200"
                      : "bg-neutral-700 text-neutral-400",
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
