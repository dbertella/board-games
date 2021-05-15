import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { take } from "lodash";
import { getUsers, userDirectory } from "./users";

export function getGameSlugs(user: string) {
  return fs.readdirSync(join(userDirectory, user));
}

export function getGameBySlug(
  slug: string,
  user: string,
  fields: string[] = []
) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(userDirectory, user, `${realSlug}.md`);
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
    if (field === "user") {
      items[field] = user;
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

export function getAllGames(fields: string[]) {
  const users = getUsers();
  return Object.fromEntries(
    users
      .map((user) =>
        getGameSlugs(user)
          .filter((slug) => !slug.startsWith("_index"))
          .map((slug) => getGameBySlug(slug, user, fields))
          .sort((game1, game2) =>
            Number(game1.rating) > Number(game2.rating) ? 1 : -1
          )
      )
      .map((userLists, i) => [users[i], userLists])
  );
}

export function getAllGamesByUser(fields: string[], user: string) {
  return getAllGames(fields)[user];
}

export function getNGamesByUser(
  fields: string[],
  user: string,
  quantity: number
) {
  return take(getAllGames(fields)[user].reverse(), quantity);
}
