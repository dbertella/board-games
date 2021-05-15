import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { take } from "lodash";

export const postDirectory = join(process.cwd(), "_posts");

export function getPosts() {
  return fs.readdirSync(postDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postDirectory, `${realSlug}.md`);
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

export function getAllPosts(fields: string[]) {
  const posts = getPosts();
  return posts
    .map((slug) => getPostBySlug(slug, fields))
    .sort((game1, game2) => (game1.date > game2.date ? -1 : 1));
}

export function getNPosts(fields: string[], quantity: number) {
  return take(getAllPosts(fields), quantity);
}
