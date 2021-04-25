import { Themed } from "@theme-ui/mdx";
import Link from "next/link";

const Header = () => {
  return (
    <Themed.h2>
      <Link href="/">
        <a>Blog</a>
      </Link>
      .
    </Themed.h2>
  );
};

export default Header;
