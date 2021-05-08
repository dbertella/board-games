import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const gamesDirectory = join(process.cwd(), "_users");

export function getUsers() {
  return fs.readdirSync(gamesDirectory);
}

export function getUserBySlug(slug: string, fields: string[] = []) {
  const fullPath = join(gamesDirectory, slug, `_index.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
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

export function getGameSlugs(user: string) {
  return fs.readdirSync(join(gamesDirectory, user));
}

export function getGameBySlug(
  slug: string,
  user: string,
  fields: string[] = []
) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(gamesDirectory, user, `${realSlug}.md`);
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

export function getAllUsers(fields: string[]) {
  const users = getUsers();
  return users.map((slug) => getUserBySlug(slug, fields)).sort();
}

export function getAllGamesByUser(fields: string[], user: string) {
  return getAllGames(fields)[user];
}
