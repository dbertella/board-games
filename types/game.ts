import { BggGameSingle } from "./bgg";

type GameType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  thumbnail: string;
  excerpt: string;
  ogImage: string;
  rating: string;
  content: string;
  item: BggGameSingle;
};

export default GameType;
