import { Themed } from "@theme-ui/mdx";
import Link from "next/link";

const Intro = () => {
  return (
    <Link href="/" passHref>
      <Themed.h2>My Boardgames.</Themed.h2>
    </Link>
  );
};

export default Intro;
