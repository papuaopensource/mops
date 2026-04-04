import type { APIRoute } from "astro";

export const prerender = false;

type ReactionKey = "lucu" | "bagus" | "suka" | "kaget";

interface ReactionCounts {
  lucu: number;
  bagus: number;
  suka: number;
  kaget: number;
}

const VALID_REACTIONS: ReactionKey[] = ["lucu", "bagus", "suka", "kaget"];

async function getCounts(
  kv: KVNamespace,
  mopId: string
): Promise<ReactionCounts> {
  const raw = await kv.get(`reaction:${mopId}`);
  if (raw) {
    try {
      return JSON.parse(raw) as ReactionCounts;
    } catch {}
  }
  return { lucu: 0, bagus: 0, suka: 0, kaget: 0 };
}

export const GET: APIRoute = async ({ params, locals }) => {
  const { id } = params;
  const kv = locals.runtime?.env?.REACTIONS;

  if (!kv) {
    return new Response(
      JSON.stringify({ lucu: 0, bagus: 0, suka: 0, kaget: 0 }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const counts = await getCounts(kv, id!);
  return new Response(JSON.stringify(counts), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ params, request, locals }) => {
  const { id } = params;
  const kv = locals.runtime?.env?.REACTIONS;

  if (!kv) {
    return new Response(JSON.stringify({ error: "Storage unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { reaction: ReactionKey; previous: ReactionKey | null };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { reaction, previous } = body;

  if (!VALID_REACTIONS.includes(reaction)) {
    return new Response(JSON.stringify({ error: "Invalid reaction" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const counts = await getCounts(kv, id!);

  // remove previous reaction if switching
  if (previous && VALID_REACTIONS.includes(previous) && previous !== reaction) {
    counts[previous] = Math.max(0, counts[previous] - 1);
  }

  // toggle: clicking same reaction removes it
  if (previous === reaction) {
    counts[reaction] = Math.max(0, counts[reaction] - 1);
  } else {
    counts[reaction] += 1;
  }

  await kv.put(`reaction:${id}`, JSON.stringify(counts));

  return new Response(JSON.stringify(counts), {
    headers: { "Content-Type": "application/json" },
  });
};
