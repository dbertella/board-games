/** @jsxImportSource theme-ui */

import he from "he";
import Intro from "../components/intro-component";
import Layout from "../components/layout";
import { getAllGames } from "../lib/games";
import Head from "next/head";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Label,
  Select,
} from "@theme-ui/components";
import PostType from "../types/post";
import Link from "next/link";
import { fetchAPI } from "../lib/api";
import { BggGameSingle } from "../types/bgg";
import { Stats } from "components/game-stats";
import GameDate from "components/game-date";
import GameRating from "components/game-rating";
import { orderBy } from "lodash";
import { useRouter } from "next/router";

type Props = {
  allPosts: PostType[];
};

const Index = ({ allPosts }: Props) => {
  const router = useRouter();
  const { order } = router.query;
  
  const orderedGames = orderBy(allPosts, order, [
    order === "title" ? "asc" : "desc",
  ]);
  return (
    <>
      <Layout>
        <Head>
          <title>My Boardgames | Daniele Bertella</title>
        </Head>
        <Intro />
        <Label htmlFor="order" sx={{ fontSize: 2 }}>
          Order by
        </Label>
        <Box
          sx={{
            mb: 3,
            position: "sticky",
            top: 0,
            zIndex: 1,
            bg: "background",
          }}
        >
          <Select
            id="order"
            arrow={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentcolor"
                sx={{
                  ml: -28,
                  alignSelf: "center",
                  pointerEvents: "none",
                }}
              >
                <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
              </svg>
            }
            value={order}
            onChange={({ target }) =>
              router.push({ query: { order: target.value } })
            }
          >
            <option value="date">Purchased Date</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </Select>
        </Box>
        <Grid columns={["auto", "1fr 1fr", "1fr 1fr 1fr"]}>
          {orderedGames.map((p) => (
            <Link
              href={{
                pathname: `/games/${p.slug}`,
                query: { ...(order ? { order } : {}) },
              }}
              key={p.slug}
              passHref
            >
              <Box
                sx={{
                  position: "relative",
                  bg: "muted",
                  padding: 3,
                  cursor: [null, null, "pointer"],
                  borderRadius: 15,
                }}
              >
                <Flex sx={{ justifyContent: "center" }}>
                  <Image src={p.coverImage} />
                </Flex>
                <Heading as="h3" my={3}>
                  {p.title}
                </Heading>
                <GameDate dateString={p.date} />
                <GameRating rating={p.rating} />
                <Box my={3} />
                <Stats {...p.item} />
              </Box>
            </Link>
          ))}
        </Grid>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllGames([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "bggId",
    "rating",
  ]);

  const ids = allPosts.map((g) => g.bggId);

  const data = await fetchAPI(`thing?id=${ids.join(",")}&stats=1`);
  const gameMap = Object.fromEntries(
    data.items.item.map((g: BggGameSingle) => [g.id, g])
  );

  return {
    props: {
      allPosts: allPosts.map((p) => ({
        ...p,
        title: he.decode(
          gameMap[p.bggId].name?.[0]?.value ?? gameMap[p.bggId].name?.value
        ),
        coverImage: gameMap[p.bggId].thumbnail,
        item: gameMap[p.bggId],
      })),
    },
  };
};
