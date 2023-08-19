import { useState, useEffect } from "react";
import { ACTIONS } from "./eventReducer";
import { useEvent } from "./EventContext";
import {
  Stack,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

export const EventEditSubItem_Title = ({ eventItem }) => {
  const { dispatch } = useEvent();
  const [editTitle, setEditTitle] = useState(eventItem);

  useEffect(() => {
    dispatch({ type: ACTIONS.EDIT_TITLE, payload: editTitle });
  }, [editTitle, dispatch, eventItem]);

  return (
    <Stack
      direction="row"
      style={{
        cursor: "url(../assets/EditCursor.png), auto",
      }}
    >
      <Center>
        <Editable textAlign={"center"} color="black" defaultValue={eventItem}>
          <EditablePreview />
          <EditableInput
            bg="brand.100"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </Editable>
      </Center>
    </Stack>
  );
};
