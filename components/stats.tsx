import { Text } from "@theme-ui/components";
import { BggGame } from "../types/bgg";

export const Stats = ({
  attr: { minplayers, maxplayers, playingtime },
  rating,
}: Pick<BggGame["stats"], "attr" | "rating">) => (
  <>
    <Text as="p">
      Players: {minplayers}
      {maxplayers !== minplayers ? ` .. ${maxplayers}` : ""}
    </Text>
    <Text as="p">Playtime: {playingtime} min</Text>
    <Text as="p">
      Bgg Rating: {Number(rating.average.attr.value).toFixed(1)}
    </Text>
    <Text as="p">My Rating: {rating.attr.value}</Text>
  </>
);
