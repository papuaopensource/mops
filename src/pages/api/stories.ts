import type { APIRoute } from "astro";
import storiesJson from "@/data/stories.json";
import type { Mop } from "@/types";
import { filterMopsByDate } from "@/lib/utils";

export const GET: APIRoute = ({ url }) => {
  const tag = url.searchParams.get("tag");

  let stories = filterMopsByDate(storiesJson as Mop[]);

  if (tag) {
    stories = stories.filter((s) =>
      s.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }

  return new Response(
    JSON.stringify({
      total: stories.length,
      data: stories,
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};
