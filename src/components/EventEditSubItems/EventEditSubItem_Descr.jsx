import { useState, useEffect } from "react";
import { ACTIONS } from "../eventReducer";
import { useEvent } from "../EventContext";
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
  width,
}) => {
  const { dispatch } = useEvent();
  const [editDescription, setEditDescription] = useState(eventItem);

  useEffect(() => {
    dispatch({ type: ACTIONS.EDIT_DESCR, payload: editDescription });
  }, [editDescription, dispatch, eventItem]);

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
          <EditablePreview cursor={"crosshair"} width={width} />
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
