import { getCollection } from "astro:content";

export type Locale = "en" | "th";

export const DEFAULT_LOCALE: Locale = "en";

export async function getLocalizedPosts(locale: Locale = DEFAULT_LOCALE) {
  const allPosts = await getCollection("blog");
  return allPosts
    .filter((post) => post.data.locale === locale && post.data.published === true)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
} 