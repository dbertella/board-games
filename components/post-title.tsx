import { Themed } from "theme-ui";

const PostTitle = ({ children, ...rest }: { children: string }) => {
  return <Themed.h1 {...rest} dangerouslySetInnerHTML={{ __html: children }} />;
};

export default PostTitle;
