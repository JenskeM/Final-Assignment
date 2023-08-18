import { useState } from "react";
import {
  Stack,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

export const EventEditSubItem_Title = ({ eventItem }) => {
  const [editTile, setEditTitle] = useState(eventItem);

  return (
    <Stack direction="row">
      <Center>
        <Editable textAlign={"center"} color="black" defaultValue={eventItem}>
          <EditablePreview cursor={"crosshair"} />
          <EditableInput
            bg="brand.100"
            value={editTile}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </Editable>
      </Center>
    </Stack>
  );
};
