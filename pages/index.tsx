import { fetchAPI } from "lib/api";
import { Box, Card, Grid, Heading, Image } from "theme-ui";

type Item = {
  image: string;
  name: string;
  numplays: number;
  originalname: string;
  status: string;
  thumbnail: string;
  yearpublished: number;
};

const Home = ({
  data,
}: {
  data: { items?: { item: Item[] }; error?: any };
}) => {
  data?.error && console.error(data?.error);
  return (
    <Box>
      <Heading as="h1">My Collection</Heading>
      <Grid columns="1fr 1fr 1fr 1fr 1fr">
        {data?.items?.item?.map((item) => (
          <Card key={item.name}>
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
                alt={item.name}
              />
            </Box>

            <Heading as="h3">
              {item.name}
            </Heading>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;

export async function getStaticProps() {
  const data = await fetchAPI("collection?username=denb&subtype=boardgame");
  console.info("homepage done", data);
  return {
    props: {
      data,
    },
  };
}
