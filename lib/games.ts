import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const gamesDirectory = join(process.cwd(), "_games");

export function getGameSlugs() {
  return fs.readdirSync(gamesDirectory);
}

export function getGameBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(gamesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllGames(fields: string[] = []) {
  const slugs = getGameSlugs();
  const games = slugs
    .map((slug) => getGameBySlug(slug, fields))
    // sort games by date in descending order
    .sort((game1, game2) => (game1.date > game2.date ? -1 : 1));
  return games;
}
