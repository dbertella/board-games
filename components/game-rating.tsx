/** @jsxImportSource theme-ui */

import { Flex, Text } from "@theme-ui/components";
import { Rating } from "./Rating";

type Props = {
  rating: string;
};

export default function GameRating({ rating, ...rest }: Props) {
  return (
    <Flex sx={{ alignItems: "center" }} {...rest}>
      <Text sx={{ mr: 2 }}>
        <strong>Rating:</strong>
      </Text>
      <Rating value={Number(rating)} />
    </Flex>
  );
}
