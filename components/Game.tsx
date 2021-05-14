import { Box, Flex, Image, Heading } from "@theme-ui/components";
import GameType from "types/game";
import { Stats } from "components/game-stats";
import GameDate from "components/game-date";
import GameRating from "components/game-rating";

export const Game = ({
  coverImage,
  title,
  date,
  rating,
  item,
  position,
}: GameType & { position: number }) => (
  <Box
    sx={{
      position: "relative",
      bg: "muted",
      padding: 3,
      cursor: [null, null, "pointer"],
      borderRadius: 15,
    }}
  >
    <Flex sx={{ justifyContent: "center" }}>
      <Image src={coverImage} />
    </Flex>
    <Heading as="h3" my={3}>
      #{position} {title}
    </Heading>
    <GameDate dateString={date} />
    <GameRating rating={rating} />
    <Box my={3} />
    <Stats {...item} />
  </Box>
);
