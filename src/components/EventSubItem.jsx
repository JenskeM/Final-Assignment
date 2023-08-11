import { getTime } from "./getTime";
import { getDate } from "./getDate";
import { Stack, Text, Image, Center } from "@chakra-ui/react";

export const EventSubItem = ({ eventItem, imgUrl, date }) => {
  const getOutput = (eventItem, date) => {
    if (date === "date") {
      const output = (
        <div>
          {getDate(eventItem[0]).props.children} -{" "}
          {getTime(eventItem[0]).props.children} <br />
          until
          <br />
          {getDate(eventItem[1]).props.children} -{" "}
          {getTime(eventItem[1]).props.children}
        </div>
      );
      return output;
    } else {
      const output = eventItem;
      return output;
    }
  };

  return (
    <Stack direction="row">
      <Center>
        <Image
          src={imgUrl}
          height={10}
          p={2}
          bg="brand.200"
          borderRadius="full"
          mr={5}
        />
        <Text textAlign={"center"}>{getOutput(eventItem, date)}</Text>
      </Center>
    </Stack>
  );
};
