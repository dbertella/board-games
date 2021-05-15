/** @jsxImportSource theme-ui */

import { useMemo, useState } from "react";
import he from "he";
import { orderBy } from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Grid } from "@theme-ui/components";
import Intro from "components/intro-component";
import { CollectionFilters } from "components/CollectionFilters";
import Layout from "components/layout";
import { getAllGamesByUser, getUserBySlug, getUsers } from "lib/games";
import { BggGameSingle } from "types/bgg";
import GameType from "types/game";

import { fetchAPI } from "lib/api";
import { Game } from "components/Game";
import { Themed } from "@theme-ui/mdx";
type Props = {
  title: string;
  allGames: GameType[];
};

const Index = ({ title, allGames }: Props) => {
  const router = useRouter();
  const { order, user } = router.query;
  const [nPlayers, setNPlayers] = useState<number>();
  const [playTime, setPlayTime] = useState<number>();

  console.log(allGames);

  const filteredGames = useMemo(() => {
    let filtered = allGames;
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
  }, [allGames, nPlayers, playTime]);

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
          <title>My Collection | {title}</title>
        </Head>
        <Intro back />
        <Themed.h1>{title}</Themed.h1>
        <CollectionFilters
          allGames={allGames}
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
              <Box>
                <Game {...p} position={++i} />
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
  const allGames = getAllGamesByUser(
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

  const user = getUserBySlug(params.user, ["title"]);

  const ids = allGames.map((g) => g.bggId);

  const data = await fetchAPI(`thing?id=${ids.join(",")}&stats=1`);
  const gameMap = Object.fromEntries(
    data.items.item.map((g: BggGameSingle) => [g.id, g])
  );

  return {
    props: {
      title: user.title,
      allGames: allGames.map((p) => ({
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
