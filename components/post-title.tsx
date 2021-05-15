import { Heading } from "theme-ui";

const PostTitle = ({ children, ...rest }: { children: string }) => {
  return (
    <Heading
      as="h3"
      sx={{ fontSize: 5 }}
      {...rest}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};

export default PostTitle;
