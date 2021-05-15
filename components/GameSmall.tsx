/** @jsxImportSource theme-ui */

import { Flex, Image, Heading } from "@theme-ui/components";
import GameType from "types/game";

export const GameSmall = ({
  coverImage,
  title,
  position,
  ...rest
}: GameType & { position: number }) => (
  <Flex
    sx={{
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      minWidth: 200,
      flex: 1,
      flexShrink: 0,
    }}
    {...rest}
  >
    <Image src={coverImage} sx={{ flexShrink: 0 }} />
    <Heading
      as="h5"
      my={3}
      sx={{
        display: "-webkit-box",
        "-webkit-line-clamp": "2",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
      }}
    >
      #{position} {title}
    </Heading>
  </Flex>
);
