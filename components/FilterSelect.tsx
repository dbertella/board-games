/** @jsxImportSource theme-ui */
import { Box, Label, Select, SelectProps } from "@theme-ui/components";
import { kebabCase } from "lodash";

const Arrow = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentcolor"
    sx={{
      ml: -28,
      alignSelf: "center",
      pointerEvents: "none",
    }}
  >
    <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
  </svg>
);

export const FilterSelect = ({
  label,
  ...rest
}: SelectProps & {
  label: string;
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        mx: 2,
        flex: 1,
      }}
    >
      <Label
        htmlFor={kebabCase(label)}
        sx={{ position: "absolute", fontSize: 0, top: "-1rem", left: 0 }}
      >
        {label}
      </Label>
      <Select
        {...rest}
        arrow={<Arrow />}
        id={kebabCase(label)}
        sx={{
          minWidth: 200,
          fontSize: 2,
          width: "100%",
        }}
      />
    </Box>
  );
};
