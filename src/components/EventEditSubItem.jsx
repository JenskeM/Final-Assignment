import { getTime } from "./getTime";
import { getDate } from "./getDate";
import {
  Stack,
  Image,
  Center,
  Tooltip,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

export const EventEditSubItem = ({ eventItem, imgUrl, date, alt }) => {
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
        <Editable
          textAlign={"center"}
          color="black"
          defaultValue={getOutput(eventItem, date)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Center>
    </Stack>
  );
};
