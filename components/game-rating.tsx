import { Flex, Text } from "@theme-ui/components";

type Props = {
  denRating: string;
  aureRating: string;
};

export default function Rating({ denRating, aureRating }: Props) {
  return (
    <>
      <Flex>
        <Text sx={{ mr: 3 }}>
          <strong>Rating:</strong>
        </Text>
        <Text sx={{ flex: 1 }}>🚀 Den: {denRating}</Text>
        <Text sx={{ flex: 1 }}>🦕 Aure: {aureRating}</Text>
      </Flex>
    </>
  );
}
