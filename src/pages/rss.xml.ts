import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import storiesJson from "@/data/stories.json";
import type { Mop } from "@/types";
import { filterMopsByDate, parseDate } from "@/lib/utils";

export const GET: APIRoute = (context) => {
  const stories = filterMopsByDate(storiesJson as Mop[]);

  return rss({
    title: "Cerita Mop",
    description: "Kumpulan cerita lucu dan anekdot khas Papua",
    site: context.site!,
    items: stories.map((story) => {
      const snippet = story.content.find((c) => c.type === "narration")?.content ?? "";
      return {
        title: story.title,
        description: snippet,
        pubDate: parseDate(story.date),
        link: `/cerita/${story.id}/`,
      };
    }),
  });
};
