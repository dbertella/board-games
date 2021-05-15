import { Box, Text } from "@theme-ui/components";
import { groupBy } from "lodash";
import { BggGameSingle } from "../types/bgg";

export const Stats = ({
  minplayers,
  maxplayers,
  playingtime,
  statistics,
  link,
}: BggGameSingle) => {
  const { boardgamecategory = [], boardgamemechanic = [] } = groupBy(
    link,
    "type"
  );
  return (
    <Box sx={{ fontSize: 2 }}>
      <Text as="p">
        <strong>Players:</strong> {minplayers.value}
        {maxplayers.value !== minplayers.value ? ` to ${maxplayers.value}` : ""}
      </Text>
      <Text as="p">
        <strong>Playtime:</strong> {playingtime.value} min
      </Text>
      <Text as="p">
        <strong>Bgg Rating:</strong>{" "}
        {Number(statistics.ratings.average.value).toFixed(1)}
      </Text>

      <Text as="p">
        <strong>Categories:</strong>{" "}
        {boardgamecategory.map((l) => l.value).join(", ")}
      </Text>
      <Text as="p">
        <strong>Mechanics:</strong>{" "}
        {boardgamemechanic.map((l) => l.value).join(", ")}
      </Text>
    </Box>
  );
};
