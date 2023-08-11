import { Stack, Text } from "@chakra-ui/react";

export const EventSubItem = ({ eventItem, property }) => {
  const capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <Stack direction="column">
      <Text as="b" textAlign={"center"} color="brand.400">
        {capitalizeFirstLowercaseRest(property)}:
      </Text>
      <Text textAlign={"center"}>{eventItem}</Text>
    </Stack>
  );
};
