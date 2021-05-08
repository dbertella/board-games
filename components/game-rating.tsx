import { Text } from "@theme-ui/components";

type Props = {
  denRating: string;
};

export default function Rating({ denRating }: Props) {
  return (
    <Text sx={{ mr: 3 }}>
      <strong>Rating:</strong> {denRating}
    </Text>
  );
}
