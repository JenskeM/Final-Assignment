import { getTime } from "./getTime";
import { getDate } from "./getDate";
import { Stack, Text, Image, Center, Tooltip } from "@chakra-ui/react";

export const EventShowSubItem = ({ eventItem, imgUrl, alt }) => {
  const getOutput = (eventItem, alt) => {
    if (alt === "Date") {
      const output = (
        <span>
          {getDate(eventItem[0]).props.children} -{" "}
          {getTime(eventItem[0]).props.children} <br />
          until
          <br />
          {getDate(eventItem[1]).props.children} -{" "}
          {getTime(eventItem[1]).props.children}
        </span>
      );
      return output;
    } else if (alt === "Categories") {
      const output = eventItem.join(", ");
      return output;
    } else {
      const output = eventItem;
      return output;
    }
  };

  return (
    <Stack direction="row">
      <Center>
        <Tooltip label={alt}>
          <Image
            src={imgUrl}
            height={10}
            p={2}
            bg="brand.200"
            borderRadius="full"
            mr={5}
            alt={alt}
          />
        </Tooltip>
        <Text textAlign={"center"} color="black">
          {getOutput(eventItem, alt)}
        </Text>
      </Center>
    </Stack>
  );
};
