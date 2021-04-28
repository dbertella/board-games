import { Text } from "@theme-ui/components";
import dayjs from "dayjs";
import "dayjs/locale/it";

dayjs.locale("en");

type Props = {
  dateString: string;
};

export default function Date({ dateString }: Props) {
  const date = dayjs(dateString);
  return (
    <Text as="p">
      <strong>Purchased:</strong>{" "}
      <time dateTime={dateString}>{date.format("MMM YYYY")}</time>
    </Text>
  );
}
