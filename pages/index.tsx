/** @jsxImportSource theme-ui */

import Intro from "../components/intro-component";
import Layout from "../components/layout";
import { getAllUsers } from "../lib/games";
import Head from "next/head";
import Link from "next/link";
import UserType from "types/user";
import { Box, Flex, Text } from "@theme-ui/components";
import { FiArrowRight } from "react-icons/fi";

type Props = {
  users: UserType[];
};

const Index = ({ users }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>My Boardgames | Daniele Bertella</title>
        </Head>
        <Intro />
        {users.map(({ title, slug, excerpt }) => (
          <Link key={slug} href={`/${slug}`} passHref>
            <Box>
              <Flex sx={{ alignItems: "center", mt: 3 }}>
                <Text as="p" sx={{ mr: 2 }}>
                  {title}
                </Text>
                <FiArrowRight />
              </Flex>
              <Text as="p" sx={{ fontSize: 1 }}>
                {excerpt}
              </Text>
            </Box>
          </Link>
        ))}
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const users = getAllUsers(["slug", "title", "excerpt"]);
  return {
    props: {
      users: users,
    },
  };
};
