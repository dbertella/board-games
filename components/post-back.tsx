import { Link as UiLink } from "@theme-ui/components";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsRight } from "react-icons/fi";

const BackToNews = () => {
  const router = useRouter();
  const { order, user } = router.query;
  return (
    <>
      <FiChevronsRight size={12} />
      <Link
        href={{
          pathname: "/news",
          query: {
            user,
            ...(order ? { order } : {}),
          },
        }}
        passHref
      >
        <UiLink sx={{ ml: 2 }}>news</UiLink>
      </Link>
    </>
  );
};

export default BackToNews;
