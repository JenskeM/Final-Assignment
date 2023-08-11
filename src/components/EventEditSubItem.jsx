import {
  Stack,
  Image,
  Center,
  Tooltip,
  Editable,
  EditableTextarea,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { TYPES } from "../pages/EventPage";

export const EventEditSubItem = ({ eventItem, imgUrl, alt, type }) => {
  console.log(type);

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
        <Editable textAlign={"center"} color="black" defaultValue={eventItem}>
          <EditablePreview />
          {
            (type = TYPES.TEXTAREA ? (
              <EditableTextarea bg="brand.100" />
            ) : (
              <EditableInput bg="brand.100" />
            ))
          }
        </Editable>
      </Center>
    </Stack>
  );
};
