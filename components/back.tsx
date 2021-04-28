import { Box } from "@theme-ui/components";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  const router = useRouter();
  const { order } = router.query;
  return (
    <Link
      href={{
        pathname: `/`,
        query: { ...(order ? { order } : {}) },
      }}
      passHref
    >
      <Box>
        <FiArrowLeft size={32} />
      </Box>
    </Link>
  );
};

export default BackButton;
