/** @jsxImportSource theme-ui */

import { Text } from "@theme-ui/components";
import dayjs from "dayjs";
import "dayjs/locale/it";

dayjs.locale("en");

type Props = {
  dateString: string;
};

export default function Date({ dateString, ...rest }: Props) {
  const date = dayjs(dateString);
  return (
    <Text as="p" {...rest}>
      <strong>Purchased:</strong>
      {dayjs().isBefore(dateString) ? " 🔜 " : " "}
      <time dateTime={dateString}>{date.format("MMM YYYY")}</time>
    </Text>
  );
}
