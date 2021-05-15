/** @jsxImportSource theme-ui */

import { Flex, Image, Heading } from "@theme-ui/components";
import { forwardRef, ForwardedRef } from "react";
import GameType from "types/game";

export const GameSmall = forwardRef(
  (
    { coverImage, title, position, ...rest }: GameType & { position: number },
    ref: ForwardedRef<HTMLDivElement | null>
  ) => (
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
      ref={ref}
      {...rest}
    >
      <Image src={coverImage} sx={{ flexShrink: 0 }} />
      <Heading
        as="h5"
        my={3}
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        #{position} {title}
      </Heading>
    </Flex>
  )
);
