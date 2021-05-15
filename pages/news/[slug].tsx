import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "components/post-body";
import Layout from "components/layout";
import Head from "next/head";
import markdownToHtml from "lib/markdownToHtml";
import PostType from "types/post";
import PostTitle from "components/post-title";
import PostHeader from "components/post-header";
import { getAllPosts, getPostBySlug } from "lib/posts";
import BackToNews from "components/post-back";
import Intro from "components/intro-component";

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
          <article>
            <Head>
              <title>{post.title} | Daniele Bertella</title>
              <meta property="og:image" content={post.ogImage} />
            </Head>
            <Intro back>
              <BackToNews />
            </Intro>

            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
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
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

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
