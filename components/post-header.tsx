import { Box, Image } from "theme-ui";
import PostTitle from "./post-title";
import Date from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
};

export default function PostHeader({ title, coverImage, date }: Props) {
  return (
    <>
      <PostTitle sx={{ mb: 1 }}>{title}</PostTitle>
      <Box
        sx={{
          fontSize: 0,
          color: "muted",
          mb: 1,
        }}
      >
        <Image src={coverImage} />
        <Date dateString={date} />
      </Box>
    </>
  );
}