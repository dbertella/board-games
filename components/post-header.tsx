import { Box, Flex, Image, Text, Link as UILink } from "theme-ui";
import dayjs from "dayjs";
import PostTitle from "./post-title";
import Link from "next/link";
import { startCase } from "lodash";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: string;
};

export default function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <PostTitle sx={{ mt: 4 }}>{title}</PostTitle>
      <Box
        sx={{
          fontSize: 2,
          mb: 1,
        }}
      >
        <Image src={coverImage} />
        <Flex>
          <time dateTime={date}>{dayjs(date).format("D MMMM YYYY")}</time>
          <Text mx={2}>-</Text>
          <Link href={`/${author}`}>
            <UILink>{startCase(author)}</UILink>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
