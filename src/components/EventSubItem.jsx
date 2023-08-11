import { getTime } from "./getTime";
import { getDate } from "./getDate";
import { Stack, Text } from "@chakra-ui/react";

export const EventSubItem = ({ eventItem, property, date }) => {
  const getOutput = (eventItem, date) => {
    if (date === "date") {
      const output =
        getDate(eventItem).props.children +
        " - " +
        getTime(eventItem).props.children;
      return output;
    } else {
      const output = eventItem;
      return output;
    }
  };

  return (
    <Stack direction="column">
      <Text
        as="b"
        textAlign={"center"}
        color="brand.400"
        bgGradient={"radial(brand.100, brand.700)"}
      >
        {property}
      </Text>
      <Text textAlign={"center"}>{getOutput(eventItem, date)}</Text>
    </Stack>
  );
};
