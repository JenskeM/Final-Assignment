import { useState } from "react";
import {
  Stack,
  Image,
  Center,
  Tooltip,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

export const EventEditSubItem = ({ eventItem, imgUrl, typeInput }) => {
  const [editLocation, setEditLocation] = useState(eventItem);

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
          <EditableInput
            bg="brand.100"
            value={editLocation}
            onChange={(e) => setEditLocation(e.target.value)}
          />
        </Editable>
      </Center>
    </Stack>
  );
};
