/** @jsxImportSource theme-ui */

import he from "he";
import Intro from "../components/intro-component";
import Layout from "../components/layout";
import { getAllGames } from "../lib/games";
import Head from "next/head";
import { Box, Flex, Grid, Heading, Image } from "@theme-ui/components";
import PostType from "../types/post";
import Link from "next/link";
import { fetchAPI } from "../lib/api";
import { BggGameSingle } from "../types/bgg";
import { Stats } from "components/game-stats";
import GameDate from "components/game-date";
import GameRating from "components/game-rating";
import { orderBy } from "lodash";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { CollectionFilters } from "components/CollectionFilters";

type Props = {
  allPosts: PostType[];
};

const Index = ({ allPosts }: Props) => {
  const router = useRouter();
  const { order } = router.query;
  const [nPlayers, setNPlayers] = useState<number>();
  const [playTime, setPlayTime] = useState<number>();

  const filteredGames = useMemo(() => {
    let filtered = allPosts;
    if (!!nPlayers) {
      filtered = filtered.filter(
        (g) =>
          Number(g.item.minplayers.value) <= nPlayers &&
          Number(g.item.maxplayers.value) >= nPlayers
      );
    }
    if (!!playTime) {
      filtered = filtered.filter(
        (g) => Number(g.item.playingtime.value) === playTime
      );
    }
    return filtered;
  }, [allPosts, nPlayers, playTime]);

  const orderedGames = orderBy(
    filteredGames,
    ["title", "date"].includes(order as string)
      ? order
      : (it) => Number(it[order as string]),
    [order === "title" ? "asc" : "desc"]
  );

  return (
    <>
      <Layout>
        <Head>
          <title>My Boardgames | Daniele Bertella</title>
        </Head>
        <Intro />
        <CollectionFilters
          allPosts={allPosts}
          {...{ nPlayers, setNPlayers, playTime, setPlayTime }}
        />
        <Grid columns={["auto", "1fr 1fr", "1fr 1fr 1fr"]}>
          {orderedGames.map((p, i) => (
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
                  #{++i} {p.title}
                </Heading>
                <GameDate dateString={p.date} />
                <GameRating denRating={p.rating} aureRating={p.aureRating} />
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
    "aureRating",
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
