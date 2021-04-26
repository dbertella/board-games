import { fetchAPI } from "../lib/api";
import { Box, Card, Grid, Heading, Image, Link } from "theme-ui";
import { BggGame } from "../types/bgg";
import { Stats } from "../components/stats";

const GameList = ({ items }: { items: { item: BggGame[] } }) => (
  <Grid columns={["auto", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr 1fr"]}>
    {items.item.map((item) => (
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
);

const Home = ({
  data,
  wishlist,
}: {
  data: { items?: { item: BggGame[] }; error?: any };
  wishlist: { items?: { item: BggGame[] }; error?: any };
}) => {
  return (
    <Box>
      <Heading as="h1" my={3}>
        My Collection
      </Heading>
      {!data?.items?.item &&
        "You might need a page refresh in order to see the content"}
      <Heading as="h3" my={3}>
        My Games
      </Heading>
      {data?.items && <GameList items={data?.items} />}

      <Heading as="h3" mt={5} mb={3}>
        My Next Games (I wish)
      </Heading>
      {wishlist?.items && <GameList items={wishlist?.items} />}
    </Box>
  );
};

export default Home;

export async function getStaticProps() {
  const collectionOptions = {
    attributeNamePrefix: "",
    ignoreAttributes: false,
    attrNodeName: "attr", //default is 'false'
    textNodeName: "text",
  };

  const data = await fetchAPI(
    "collection?username=denb&subtype=boardgame&stats=1&own=1",
    collectionOptions
  );
  const wishlist = await fetchAPI(
    "collection?username=denb&subtype=boardgame&stats=1&own=0",
    collectionOptions
  );

  return {
    props: {
      data,
      wishlist,
    },
  };
}
