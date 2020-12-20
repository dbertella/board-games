import { fetchAPI } from "lib/api";
import { Box, Card, Grid, Heading, Image, Text } from "theme-ui";

type Item = {
  image: string;
  name: { text: string };
  numplays: number;
  originalname: string;
  status: string;
  thumbnail: string;
  yearpublished: number;
  attr: Record<string, string>;
  stats: {
    attr: {
      minplayers: string;
      maxplayers: string;
      minplaytime: string;
      maxplaytime: string;
      playingtime: string;
      numowned: string;
    };
    rating: {
      attr: {
        value: string;
      };
      usersrated: {
        attr: {
          value: string;
        };
      };
      average: {
        attr: {
          value: string;
        };
      };
    };
  };
};

const Stats = ({
  attr: { minplayers, maxplayers, playingtime },
  rating,
}: Pick<Item["stats"], "attr" | "rating">) => (
  <>
    <Text>
      Players: {minplayers}
      {maxplayers !== minplayers ? ` .. ${maxplayers}` : ""}
    </Text>
    <Text>Playtime: {playingtime} min</Text>
    <Text>Bgg Rating: {Number(rating.average.attr.value).toFixed(1)}</Text>
    <Text>My Rating: {rating.attr.value}</Text>
  </>
);

const Home = ({
  data,
}: {
  data: { items?: { item: Item[] }; error?: any };
}) => {
  console.log(data);
  return (
    <Box>
      <Heading as="h1" my={3}>
        My Collection
      </Heading>
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
