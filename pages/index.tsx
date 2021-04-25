import { fetchAPI } from "../lib/api";
import { Box, Card, Grid, Heading, Image, Link, Text } from "theme-ui";
import { BggGame } from "../types/bgg";

const Stats = ({
  attr: { minplayers, maxplayers, playingtime },
  rating,
}: Pick<BggGame["stats"], "attr" | "rating">) => (
  <>
    <Text as="p">
      Players: {minplayers}
      {maxplayers !== minplayers ? ` .. ${maxplayers}` : ""}
    </Text>
    <Text as="p">Playtime: {playingtime} min</Text>
    <Text as="p">Bgg Rating: {Number(rating.average.attr.value).toFixed(1)}</Text>
    <Text as="p">My Rating: {rating.attr.value}</Text>
  </>
);

const Home = ({
  data,
}: {
  data: { items?: { item: BggGame[] }; error?: any };
}) => {
  return (
    <Box>
      <Heading as="h1" my={3}>
        My Collection
      </Heading>
      {!data?.items?.item &&
        "You might need a page refresh in order to see the content"}
      <Grid columns={["auto", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr 1fr"]}>
        {data?.items?.item?.map((item) => (
          <Card key={item.attr.objectid}>
            <Box
              sx={{
                position: "relative",
                height: [150, null, 300],
                bg: "muted",
                padding: "5%",
              }}
            >
              <Link
                href={`https://boardgamegeek.com/boardgame/${item.attr.objectid}`}
              >
                <Image
                  sx={{
                    position: "absolute",
                    height: "90%",
                    width: "90%",
                    objectFit: "contain",
                    verticalAlign: "bottom",
                  }}
                  src={item.image}
                  alt={item.name.text}
                />
              </Link>
            </Box>
            <Heading as="h3" mt={2}>
              {item.name.text}
            </Heading>
            <Stats {...item.stats} />
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;

export async function getStaticProps() {
  const data = await fetchAPI(
    "collection?username=denb&subtype=boardgame&stats=1"
  );

  return {
    props: {
      data,
    },
  };
}
