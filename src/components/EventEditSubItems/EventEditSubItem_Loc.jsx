import { useState, useEffect } from "react";
import { ACTIONS } from "../eventReducer";
import { useEvent } from "../EventContext";
import {
  Stack,
  Image,
  Center,
  Tooltip,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

export const EventEditSubItem_Loc = ({ eventItem, imgUrl, typeInput }) => {
  const { dispatch } = useEvent();
  const [editLocation, setEditLocation] = useState(eventItem);
  const [locCheck, setLocCheck] = useState(false);

  useEffect(() => {
    if (editLocation !== "" && editLocation !== eventItem) {
      setLocCheck(editLocation.length <= 3);
      dispatch({ type: ACTIONS.EDIT_LOC, payload: editLocation });
    }
  }, [editLocation, dispatch, eventItem]);

  useEffect(() => {
    dispatch({ type: ACTIONS.LOC_CHECK, payload: locCheck });
  }, [locCheck, dispatch]);

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
          <EditablePreview cursor={"crosshair"} minWidth={"100px"} />
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
