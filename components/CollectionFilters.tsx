import { Box, Button, Flex } from "@theme-ui/components";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { FilterSelect } from "components/FilterSelect";
import { useMemo, useState } from "react";
import PostType from "types/post";
import { min, max, uniq, range } from "lodash";
import { useRouter } from "next/router";

const HEADER_HEIGHT = 80;

const getPlayersAndPlayTimeOptions = (allGames: PostType[]) => {
  const minPlayer = min(allGames.map((g) => Number(g.item.minplayers.value)));
  const maxPlayer = max(allGames.map((g) => Number(g.item.maxplayers.value)));
  const playTimes = uniq(allGames.map((g) => Number(g.item.playingtime.value)))
    .filter(Boolean)
    .sort((a, b) => a - b);

  return [range(minPlayer as number, maxPlayer as number), playTimes];
};

type Props = {
  allPosts: PostType[];
  nPlayers?: number;
  setNPlayers: (n: number) => void;
  playTime?: number;
  setPlayTime: (n: number) => void;
};
export const CollectionFilters = ({
  allPosts,
  nPlayers,
  setNPlayers,
  playTime,
  setPlayTime,
}: Props) => {
  const router = useRouter();
  const { order, user } = router.query;
  const [hideOnScroll, setHideOnScroll] = useState(true);
  const [filterDisplay, setFilterDisplay] = useState(false);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y || currPos.y > -HEADER_HEIGHT;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll],
    undefined,
    false,
    500
  );
  const [nPlayersOption, playTimeOptions] = useMemo(
    () => getPlayersAndPlayTimeOptions(allPosts),
    [allPosts]
  );

  return (
    <Flex
      sx={{
        pt: 3,
        pb: 2,
        mb: 3,
        mx: -2,
        position: "sticky",
        top: 0,
        zIndex: 1,
        bg: "background",
        flexDirection: ["column", null, "row"],
        visibility: hideOnScroll ? "visible" : "hidden",
        transition: `all 300ms ${hideOnScroll ? "ease-in" : "ease-out"}`,
        transform: hideOnScroll ? "none" : "translate(0, -100%)",
      }}
    >
      <Flex
        sx={{
          flex: 1,
        }}
      >
        <FilterSelect
          label="Sort by"
          value={order}
          onChange={({ target }) =>
            router.push({
              query: {
                user,
                order: target.value,
              },
            })
          }
        >
          <option value="rating">Rating</option>
          <option value="date">Purchased Date</option>
          <option value="title">Title</option>
        </FilterSelect>
        <Button
          sx={{
            display: [null, null, "none"],
            lineHeight: 1,
            mr: 2,
            fontSize: 0,
          }}
          onClick={() => setFilterDisplay((state) => !state)}
        >
          {filterDisplay ? "Hide" : "Show"}
          <br />
          Filters
        </Button>
      </Flex>
      <Flex
        sx={{
          flex: 2,
          flexDirection: ["column", null, "row"],
          display: [
            filterDisplay ? null : "none !important",
            null,
            "flex !important",
          ],
          position: ["absolute", null, "relative"],
          top: "100%",
          bg: "background",
          width: "100%",
        }}
      >
        <Box sx={{ mt: 3 }} />
        <FilterSelect
          label="Number of players"
          value={nPlayers}
          onChange={({ target }) => setNPlayers(Number(target.value))}
        >
          <option value="">All number of players</option>
          {nPlayersOption.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </FilterSelect>
        <Box sx={{ mt: 3 }} />
        <FilterSelect
          label="Playtime"
          value={playTime}
          onChange={({ target }) => setPlayTime(Number(target.value))}
        >
          <option value="">All playtimes</option>
          {playTimeOptions.map((o) => (
            <option key={o} value={o}>
              {o} min
            </option>
          ))}
        </FilterSelect>
      </Flex>
    </Flex>
  );
};
