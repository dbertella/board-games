/** @jsxImportSource theme-ui */

import Intro from "../components/intro-component";
import Layout from "../components/layout";
import { getNGamesByUser } from "../lib/games";
import { getAllUsers } from "../lib/users";
import Head from "next/head";
import Link from "next/link";
import UserType from "types/user";
import { Box, Link as UILink, Flex, Heading, Text } from "@theme-ui/components";
import { FiArrowRight } from "react-icons/fi";
import { fetchAPI } from "lib/api";
import { BggGameSingle } from "types/bgg";
import he from "he";
import { uniq } from "lodash";
import GameType from "types/game";
import PostType from "types/post";
import { GameSmall } from "components/GameSmall";
import { getNPosts } from "lib/posts";
import { NewsSection } from "./news";

type Props = {
  users: (UserType & { games: GameType[] })[];
  posts: PostType[];
};

const Index = ({ users, posts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>My Boardgames | Daniele Bertella</title>
        </Head>
        <Intro />
        <NewsSection posts={posts} />
        <Heading as="h2" sx={{ mt: 3, mb: 2 }}>
          Collections
        </Heading>
        {users.map(({ title, slug, excerpt, games }) => (
          <Box sx={{ mb: 5 }} key={slug}>
            <Heading as="h3" sx={{ mt: 3, mb: 2 }}>
              {title}
            </Heading>
            <Text as="p" sx={{ fontSize: 1, mb: 3 }}>
              {excerpt}
            </Text>
            <Box
              sx={{
                bg: "muted",
                p: 3,
                borderRadius: 15,
              }}
            >
              <Flex
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Heading as="h3">Top 5</Heading>
                <Link key={slug} href={`/${slug}`}>
                  <UILink>
                    <Flex sx={{ alignItems: "center", fontSize: 1 }}>
                      view all <FiArrowRight sx={{ ml: 2 }} />
                    </Flex>
                  </UILink>
                </Link>
              </Flex>
              <Flex sx={{ alignItems: "center", overflow: "auto", gap: 3 }}>
                {games.map((game, i) => (
                  <Link href={`/${slug}/${game.slug}`} key={game.slug} passHref>
                    <GameSmall {...game} position={++i} />
                  </Link>
                ))}
              </Flex>
            </Box>
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

  const posts = getNPosts(
    ["title", "date", "slug", "author", "coverImage", "excerpt"],
    5
  );
  return {
    props: {
      posts,
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
