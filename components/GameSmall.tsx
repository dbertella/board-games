/** @jsxImportSource theme-ui */

import { Box, Flex, Image, Heading } from "@theme-ui/components";
import GameType from "types/game";

export const GameSmall = ({
  coverImage,
  title,
  position,
}: GameType & { position: number }) => (
  <Box
    sx={{
      position: "relative",
    }}
  >
    <Flex sx={{ justifyContent: "center" }}>
      <Image src={coverImage} />
    </Flex>
    <Heading as="h5" my={3}>
      #{position} {title}
    </Heading>
  </Box>
);
