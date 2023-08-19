import { useState, useEffect } from "react";
import { useEvent } from "./EventContext";
import { ACTIONS } from "./eventReducer";
import { getTime } from "./getTime";
import { getDate } from "./getDate";
import DatePicker from "react-datepicker";
import "../pages/react-datepicker.css";
import {
  Stack,
  Image,
  Center,
  Tooltip,
  Editable,
  Text,
} from "@chakra-ui/react";

export const EventEditSubItem_DateStart = ({
  eventItem,
  imgUrl,
  typeInput,
}) => {
  const { dispatch } = useEvent();
  const [editDate, setEditDate] = useState(false);
  const [newStart, setNewStart] = useState(new Date(eventItem));

  const getOutput = (eventItem) => {
    const output = (
      <span>
        {getDate(eventItem).props.children} -{" "}
        {getTime(eventItem).props.children}
      </span>
    );
    return output;
  };

  useEffect(() => {
    console.log(newStart);
    // const getArrayStart = newStart.split(" ");
    //   const revertDateStart = getArrayStart[0].split("-").reverse().join("-");
    //   const editStart = revertDateStart + "T" + getArrayStart[1] + ":00.000Z";
    //   dispatch({ type: ACTIONS.EDIT_START, payload: editStart });
  }, [newStart, dispatch, eventItem]);

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
          {editDate ? (
            <DatePicker
              selectStart
              selected={newStart}
              onChange={(date) => setNewStart(date)}
              showTimeSelect
              dateFormat="dd-MM-yyy HH:mm"
              name="startTime"
              width="300px"
              className="custom-datepicker-input"
            />
          ) : (
            <Text cursor={"crosshair"} onClick={() => setEditDate(!editDate)}>
              {getOutput(eventItem)}
            </Text>
          )}
        </Editable>
      </Center>
    </Stack>
  );
};
