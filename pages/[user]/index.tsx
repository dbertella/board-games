/** @jsxImportSource theme-ui */

import { useMemo, useState } from "react";
import he from "he";
import { orderBy } from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Grid, Heading } from "@theme-ui/components";
import Intro from "components/intro-component";
import { CollectionFilters } from "components/CollectionFilters";
import Layout from "components/layout";
import { getAllGamesByUser } from "lib/games";
import { getUserBySlug, getUsers } from "lib/users";
import { BggGameSingle } from "types/bgg";
import GameType from "types/game";

import { fetchAPI } from "lib/api";
import { Game } from "components/Game";
import markdownToHtml from "lib/markdownToHtml";
import PostBody from "components/post-body";
type Props = {
  title: string;
  content: string;
  allGames: GameType[];
};

const Index = ({ title, content, allGames }: Props) => {
  const router = useRouter();
  const { order, user } = router.query;
  const [nPlayers, setNPlayers] = useState<number>();
  const [playTime, setPlayTime] = useState<number>();

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
        <Heading as="h1" mt={3} mb={2}>
          {title}
        </Heading>
        <PostBody content={content} />
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

  const user = getUserBySlug(params.user, ["title", "content"]);
  const content = await markdownToHtml(user.content || "");

  const ids = allGames.map((g) => g.bggId);

  const data = await fetchAPI(`thing?id=${ids.join(",")}&stats=1`);
  const gameMap = Object.fromEntries(
    data.items.item.map((g: BggGameSingle) => [g.id, g])
  );

  return {
    props: {
      title: user.title,
      content: content,
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
