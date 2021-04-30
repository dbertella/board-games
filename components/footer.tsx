import dayjs from "dayjs";
import { Box, Text } from "theme-ui";

export default function Footer() {
  return (
    <Box
      as="footer"
      variant="styles.container"
      sx={{
        my: 3,
        py: 2,
      }}
    >
      <Text sx={{ fontSize: 2 }}>
        © {dayjs().get("year")} Daniele Bertella 🎲
      </Text>
    </Box>
  );
}
