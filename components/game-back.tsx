import { Flex, Heading } from "@theme-ui/components";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = ({ title }: { title: string }) => {
  const router = useRouter();
  const { order, user } = router.query;
  return (
    <Link
      href={{
        pathname: "/[user]",
        query: {
          user,
          ...(order ? { order } : {}),
        },
      }}
      passHref
    >
      <Flex sx={{ mb: 3, alignItems: "center" }}>
        <FiArrowLeft size={32} />
        <Heading as="h2" sx={{ ml: 3 }}>
          {title} Collection
        </Heading>
      </Flex>
    </Link>
  );
};

export default BackButton;
