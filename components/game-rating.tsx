import { Text } from "@theme-ui/components";

type Props = {
  rating: string;
};

export default function Rating({ rating }: Props) {
  return (
    <Text as="p">
      <strong>My Rating:</strong> {rating}
    </Text>
  );
}
