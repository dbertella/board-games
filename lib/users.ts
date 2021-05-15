import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export const userDirectory = join(process.cwd(), "_users");

export function getUsers() {
  return fs.readdirSync(userDirectory);
}

export function getUserBySlug(slug: string, fields: string[] = []) {
  const fullPath = join(userDirectory, slug, `_index.md`);
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

export function getAllUsers(fields: string[]) {
  const users = getUsers();
  return users.map((slug) => getUserBySlug(slug, fields)).sort();
}
