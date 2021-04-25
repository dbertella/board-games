import dayjs from "dayjs";
import { Box, Text } from "theme-ui";

export default function Footer() {
  return (
    <Box
      as="footer"
      sx={{
        p: 2,
      }}
    >
      <Text sx={{ fontSize: 3, fontWeight: 700, mb: 2 }}>
        © {dayjs().get("year")} Daniele Bertella
      </Text>
    </Box>
  );
}
