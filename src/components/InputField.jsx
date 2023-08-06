import { Grid, FormLabel, Input } from "@chakra-ui/react";

export const InputField = ({ labelText, nameText, screenSize }) => {
  <Grid
    gridTemplateColumns={screenSize.width <= 360 ? 300 : "110px 300px"}
    alignItems={"center"}
  >
    <FormLabel>{labelText}</FormLabel>
    <Input type="text" bg={"brand.100"} name={nameText} />
  </Grid>;
};
