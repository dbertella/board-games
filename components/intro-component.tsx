/** @jsxImportSource theme-ui */

import { Flex, Box, Heading, Link as UiLink, Text } from "@theme-ui/components";
import Link from "next/link";
import { ReactNode } from "react";
import { FiChevronsRight } from "react-icons/fi";

const Intro = ({
  back,
  children,
}: {
  back?: boolean;
  children?: ReactNode;
}) => {
  return (
    <>
      <Heading as="h2">Boardgames.</Heading>
      <Box mb={2} />
      {back && (
        <Flex sx={{ alignItems: "center", lineHeight: 1, fontSize: 2 }} mb={3}>
          <Text sx={{ mr: 2 }}>Go to</Text>
          <FiChevronsRight size={12} />
          <Link href="/" passHref>
            <UiLink sx={{ mx: 2 }}>home</UiLink>
          </Link>
          {children}
        </Flex>
      )}
    </>
  );
};

export default Intro;
