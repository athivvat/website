import { type CollectionEntry, getCollection } from "astro:content";
import type { Locale } from "./i18n";

export async function getBlogStaticPaths(locale: Locale) {
  const posts = await getCollection("blog", (entry) => 
    entry.data.locale === locale && entry.data.published === true
  );

  return posts.map((post) => {
    // Remove locale prefix from post.id for clean URLs
    const slug = post.id.replace(/^(en|th)\//, "");
    return {
      params: { slug },
      props: post,
    };
  });
}

export function extractHeadings(body?: string) {
  return body?.match(/^#{2,3}\s+(.+)$/gm)?.map((heading) => {
    const depth = heading.match(/^#+/)?.[0].length ?? 2;
    const text = heading.replace(/^#+\s+/, "");
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+$/, "");
    return { depth, slug, text };
  }) ?? [];
} 