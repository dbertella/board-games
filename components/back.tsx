import { Box } from "@theme-ui/components";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  return (
    <Link href="/list" passHref>
      <Box>
        <FiArrowLeft size={32} />
      </Box>
    </Link>
  );
};

export default BackButton;
