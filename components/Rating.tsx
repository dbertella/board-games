/** @jsxImportSource theme-ui */

const getColorForRating = (value: number): string => {
  if (value === null) {
    return "#BBBBBB";
  }
  switch (true) {
    case value >= 8:
      return "#1C9E38";
    case value >= 7:
      return "#4FB400";
    case value >= 6:
      return "#8BCC00";
    case value >= 5:
      return "#F4BC00";
    case value >= 4:
      return "#FF7C00";
    default:
      return "#FF1D25";
  }
};

type Props = {
  value: number;
};

export const Rating = ({ value, ...rest }: Props) => (
  <svg
    width="40"
    height="24"
    viewBox="0 0 40 24"
    fill="white"
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="40"
      height="24"
      rx="0.5"
      fill={getColorForRating(value)}
    />
    <text
      x="50%"
      y="58%"
      rx="0.5"
      dominantBaseline="middle"
      sx={{ fontFamily: "monospace", fontWeight: "bold", fontSize: 1 }}
      textAnchor="middle"
    >
      {value?.toFixed(1) || "n/a"}
    </text>
  </svg>
);
