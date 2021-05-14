/** @jsxImportSource theme-ui */

import { Flex, Heading } from "@theme-ui/components";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const Intro = ({ back }: { back?: boolean }) => {
  return (
    <Link href="/" passHref>
      <Flex sx={{ alignItems: "center" }}>
        {back && <FiArrowLeft size={32} sx={{ mr: 3 }} />}
        <Heading as="h2">Game Collections.</Heading>
      </Flex>
    </Link>
  );
};

export default Intro;
