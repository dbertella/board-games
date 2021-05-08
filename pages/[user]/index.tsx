/** @jsxImportSource theme-ui */

import { useMemo, useState } from "react";
import he from "he";
import { orderBy } from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Flex, Grid, Heading, Image } from "@theme-ui/components";
import { Stats } from "components/game-stats";
import GameDate from "components/game-date";
import GameRating from "components/game-rating";
import Intro from "components/intro-component";
import { CollectionFilters } from "components/CollectionFilters";
import Layout from "components/layout";
import { getAllGamesByUser, getUsers } from "lib/games";
import PostType from "types/post";
import { BggGameSingle } from "types/bgg";

import { fetchAPI } from "lib/api";
type Props = {
  allPosts: PostType[];
};

const Index = ({ allPosts }: Props) => {
  const router = useRouter();
  const { order, user } = router.query;
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
                pathname: `/[user]/${p.slug}`,
                query: {
                  user,
                  ...(order ? { order } : {}),
                },
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
                <GameRating denRating={p.rating} />
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

type Params = {
  params: {
    user: string;
  };
};

export async function getStaticPaths() {
  const users = getUsers();

  return {
    paths: users.map((user) => {
      return {
        params: {
          user: user,
        },
      };
    }),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const allPosts = getAllGamesByUser(
    [
      "title",
      "date",
      "slug",
      "author",
      "coverImage",
      "excerpt",
      "bggId",
      "rating",
    ],
    params.user
  );

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
