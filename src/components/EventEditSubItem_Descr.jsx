import { useState } from "react";
import {
  Stack,
  Image,
  Center,
  Tooltip,
  Editable,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";

export const EventEditSubItem_Descr = ({
  eventItem,
  imgUrl,
  typeInput,
  currentEvent,
}) => {
  const [editDescription, setEditDescription] = useState(eventItem);

  currentEvent.description = editDescription;

  return (
    <Stack direction="row">
      <Center>
        <Tooltip label={typeInput}>
          <Image
            src={imgUrl}
            height={10}
            p={2}
            bg="brand.200"
            borderRadius="full"
            mr={5}
            alt={typeInput}
          />
        </Tooltip>
        <Editable textAlign={"center"} color="black" defaultValue={eventItem}>
          <EditablePreview cursor={"crosshair"} />
          <EditableTextarea
            bg="brand.100"
            value={editDescription}
            onChange={(e) => {
              setEditDescription(e.target.value);
            }}
          />
        </Editable>
      </Center>
    </Stack>
  );
};
