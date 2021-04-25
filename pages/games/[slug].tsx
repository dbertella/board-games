import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "../../components/post-body";
import Layout from "../../components/layout";
import { getGameBySlug, getAllGames } from "../../lib/games";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import PostType from "../../types/post";
import Header from "../../components/header";
import PostTitle from "../../components/post-title";
import PostHeader from "../../components/post-header";
import { fetchAPI } from "../../lib/api";

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
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.title} | Daniele Bertella</title>
              <meta property="og:image" content={post.ogImage} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
            />
            <PostBody content={post.content} />
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
  ]);
  const content = await markdownToHtml(post.content || "");

  const data = await fetchAPI(`thing?id=${post.bggId}`);

  const ogImage = post.ogImage ?? data.items.item.image;
  const coverImage = post.coverImage ?? data.items.item.image;
  return {
    props: {
      post: {
        ...post,
        content,
        ogImage,
        coverImage,
        ...data,
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
