import type { APIRoute } from "astro";
import storiesJson from "@/data/stories.json";
import type { Mop } from "@/types";
import { filterMopsByDate } from "@/lib/utils";

export const GET: APIRoute = ({ params }) => {
  const stories = filterMopsByDate(storiesJson as Mop[]);
  const story = stories.find((s) => s.id === params.id);

  if (!story) {
    return new Response(JSON.stringify({ error: "Story not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response(JSON.stringify({ data: story }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
