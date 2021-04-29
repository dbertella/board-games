/** @jsxImportSource theme-ui */

import { useRouter } from "next/router";
import Clamp from "react-clamp-lines";
import ErrorPage from "next/error";
import PostBody from "../../components/post-body";
import Layout from "../../components/layout";
import { getGameBySlug, getAllGames } from "../../lib/games";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import PostType from "../../types/post";
import PostTitle from "../../components/post-title";
import PostHeader from "../../components/post-header";
import { fetchAPI } from "../../lib/api";
import he from "he";
import { Stats } from "../../components/game-stats";
import GameDate from "../../components/game-date";
import GameRating from "../../components/game-rating";
import { Flex, Box, Heading, Link } from "@theme-ui/components";
import { FiLink } from "react-icons/fi";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

const Post = ({ post }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.title} | Daniele Bertella</title>
              <meta property="og:image" content={post.ogImage} />
            </Head>
            <PostHeader title={post.title} coverImage={post.coverImage} />
            <GameDate dateString={post.date} />
            <GameRating rating={post.rating} />
            <PostBody content={post.content} />
            <Box
              sx={{
                position: "relative",
                bg: "muted",
                padding: 3,
                borderRadius: 15,
              }}
            >
              <Flex
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Heading as="h2">From BGG</Heading>
                <Link
                  href={`https://boardgamegeek.com/boardgame/${post.item.id}`}
                  sx={{ mb: 3 }}
                >
                  Source
                  <FiLink sx={{ ml: 1 }} size={14} />
                </Link>
              </Flex>
              <Stats {...post.item} />
              <Heading as="h3" sx={{ my: 3 }}>
                Description
              </Heading>

              <Clamp
                id="game-description"
                text={he.decode(he.decode(post.item.description))}
                lines={4}
              />
            </Box>
          </article>
        </>
      )}
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getGameBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "ogImage",
    "coverImage",
    "bggId",
    "rating",
  ]);
  const content = await markdownToHtml(post.content || "");

  const data = await fetchAPI(`thing?id=${post.bggId}&stats=1`);

  const title =
    post.title ??
    data.items.item.name?.[0]?.value ??
    data.items.item.name.value;
  const ogImage = post.ogImage ?? data.items.item.image;
  const coverImage = post.coverImage ?? data.items.item.image;
  return {
    props: {
      post: {
        ...post,
        content,
        ogImage,
        coverImage,
        title,
        ...data.items,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllGames(["slug"]);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}
