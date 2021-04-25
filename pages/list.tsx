import Intro from "../components/introcomponent";
import Layout from "../components/layout";
import { getAllGames } from "../lib/games";
import Head from "next/head";
import { Box } from "@theme-ui/components";
import PostType from "../types/post";
import Link from "next/link";

type Props = {
  allPosts: PostType[];
};

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>My Boardgames | Daniele Bertella</title>
        </Head>
        <Box>
          <Intro />
          {allPosts.map((p) => (
            <Link href={`/games/${p.slug}`}>
              <a>{p.title}</a>
            </Link>
          ))}
        </Box>
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
  ]);

  return {
    props: { allPosts },
  };
};
