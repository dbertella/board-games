import { BggGameSingle } from "./bgg";

type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  thumbnail: string;
  excerpt: string;
  ogImage: string;
  content: string;
  item: BggGameSingle;
};

export default PostType;
