import { Flex, Image } from "theme-ui";
import PostTitle from "./post-title";
import Back from "./back";

type Props = {
  title: string;
  coverImage: string;
};

export default function PostHeader({ title, coverImage }: Props) {
  return (
    <>
      <Back />
      <PostTitle sx={{ mb: 1 }}>{title}</PostTitle>
      <Flex
        sx={{
          fontSize: 0,
          mb: 1,
          justifyContent: "center",
        }}
      >
        <Image src={coverImage} sx={{ maxWidth: 500, width: "100%" }} />
      </Flex>
    </>
  );
}
