import { Text } from "@theme-ui/components";
import { BggGameSingle } from "../types/bgg";

export const Stats = ({
  minplayers,
  maxplayers,
  playingtime,
  statistics,
}: BggGameSingle) => (
  <>
    <Text as="p">
      Players: {minplayers.value}
      {maxplayers.value !== minplayers.value ? ` .. ${maxplayers.value}` : ""}
    </Text>
    <Text as="p">Playtime: {playingtime.value} min</Text>
    <Text as="p">
      Bgg Rating: {Number(statistics.ratings.average.value).toFixed(1)}
    </Text>
  </>
);
