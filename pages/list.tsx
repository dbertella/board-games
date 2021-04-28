import Intro from "../components/introcomponent";
import Layout from "../components/layout";
import { getAllGames } from "../lib/games";
import Head from "next/head";
import { Box, Flex, Grid, Heading, Image } from "@theme-ui/components";
import PostType from "../types/post";
import Link from "next/link";
import { fetchAPI } from "../lib/api";
import { BggGameSingle } from "../types/bgg";
import { Stats } from "components/game-stats";

type Props = {
  allPosts: PostType[];
};

const Index = ({ allPosts }: Props) => {
  console.log(allPosts);
  return (
    <>
      <Layout>
        <Head>
          <title>My Boardgames | Daniele Bertella</title>
        </Head>
        <Intro />
        <Grid columns={["auto", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr 1fr"]}>
          {allPosts.map((p) => (
            <Link href={`/games/${p.slug}`} key={p.slug} passHref>
              <Box
                sx={{
                  position: "relative",
                  bg: "muted",
                  padding: 3,
                  cursor: [null, null, "pointer"],
                }}
              >
                <Flex sx={{ justifyContent: "center" }}>
                  <Image src={p.coverImage} sx={{}} />
                </Flex>
                <Heading as="h3" mt={2}>
                  {p.title}
                </Heading>
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
        title:
          gameMap[p.bggId].name?.[0]?.value ?? gameMap[p.bggId].name?.value,
        coverImage: gameMap[p.bggId].thumbnail,
        item: gameMap[p.bggId],
      })),
    },
  };
};
