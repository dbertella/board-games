/** @jsxImportSource theme-ui */

import Intro from "../components/intro-component";
import Layout from "../components/layout";
import { getAllUsers, getNGamesByUser } from "../lib/games";
import Head from "next/head";
import Link from "next/link";
import UserType from "types/user";
import { Box, Button, Flex, Grid, Heading, Text } from "@theme-ui/components";
import { FiArrowRight } from "react-icons/fi";
import { fetchAPI } from "lib/api";
import { BggGameSingle } from "types/bgg";
import he from "he";
import { uniq } from "lodash";
import GameType from "types/game";
import { GameSmall } from "components/GameSmall";

type Props = {
  users: (UserType & { games: GameType[] })[];
};

const Index = ({ users }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>My Boardgames | Daniele Bertella</title>
        </Head>
        <Intro />
        {users.map(({ title, slug, excerpt, games }) => (
          <Box sx={{ mb: 5 }} key={slug}>
            <Heading as="h2" sx={{ mt: 3, mb: 2 }}>
              {title}
            </Heading>
            <Text as="p" sx={{ fontSize: 1, mb: 3 }}>
              {excerpt}
            </Text>
            <Heading as="h3" sx={{ mb: 2 }}>
              Top 5
            </Heading>
            <Grid columns={["1fr 1fr 1fr", null, "1fr 1fr 1fr 1fr 1fr"]}>
              {games.map((game, i) => (
                <Link href={`/${slug}/${game.slug}`} key={game.slug} passHref>
                  <Box>
                    <GameSmall {...game} position={++i} />
                  </Box>
                </Link>
              ))}
            </Grid>
            <Flex sx={{ justifyContent: "center" }}>
              <Link key={slug} href={`/${slug}`}>
                <Button as="a" sx={{ alignItems: "center", fontSize: 1 }}>
                  <Flex sx={{ alignItems: "center" }}>
                    VIEW ALL <FiArrowRight sx={{ ml: 2 }} />
                  </Flex>
                </Button>
              </Link>
            </Flex>
          </Box>
        ))}
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const users = getAllUsers(["slug", "title", "excerpt"]);

  const userWithGames = users.map((user) => {
    const games = getNGamesByUser(
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
      user.slug,
      5
    );

    return {
      ...user,
      games,
    };
  });

  const ids = uniq(
    userWithGames.map((user) => user.games.map((g) => g.bggId)).flat()
  );
  const data = await fetchAPI(`thing?id=${ids.join(",")}&stats=1`);
  const gameMap = Object.fromEntries(
    data.items.item.map((g: BggGameSingle) => [g.id, g])
  );

  return {
    props: {
      users: userWithGames.map((user) => ({
        ...user,
        games: user.games.map((g) => ({
          ...g,
          title: he.decode(
            gameMap[g.bggId].name?.[0]?.value ?? gameMap[g.bggId].name?.value
          ),
          coverImage: gameMap[g.bggId].thumbnail,
          item: gameMap[g.bggId],
        })),
      })),
    },
  };
};
