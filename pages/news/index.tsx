/** @jsxImportSource theme-ui */

import Intro from "components/intro-component";
import Layout from "components/layout";
import Head from "next/head";
import Link from "next/link";
import { Box, Link as UILink, Flex, Heading, Text } from "@theme-ui/components";
import { FiArrowRight } from "react-icons/fi";
import PostType from "types/post";
import { getAllPosts } from "lib/posts";
import PostHeader from "components/post-header";

type Props = {
  posts: PostType[];
};

export const NewsSection = ({ posts }: Props) => (
  <>
    <Heading as="h2" sx={{ mt: 3, mb: 2 }}>
      News
    </Heading>
    {posts.map(({ title, slug, date, author, coverImage, excerpt }) => (
      <Box sx={{ mb: 5 }} key={slug}>
        <PostHeader
          title={title}
          coverImage={coverImage}
          date={date}
          author={author}
        />
        <Text as="p" sx={{ mb: 3 }}>
          {excerpt}
        </Text>
        <Link key={slug} href={`/news/${slug}`} passHref>
          <UILink>
            <Flex sx={{ alignItems: "center" }}>
              read more <FiArrowRight sx={{ ml: 2 }} />
            </Flex>
          </UILink>
        </Link>
      </Box>
    ))}
  </>
);

const Index = ({ posts }: Props) => {
  return (
    <Layout>
      <Head>
        <title>My Boardgames | Daniele Bertella</title>
      </Head>
      <Intro back />
      <NewsSection posts={posts} />
    </Layout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);
  return {
    props: {
      posts,
    },
  };
};
