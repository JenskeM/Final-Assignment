import { useState, useEffect } from "react";
import { getTime } from "./getTime";
import { getDate } from "./getDate";
import { useEvent } from "../components/EventContext";
import { ACTIONS } from "./eventReducer";
import { parseISO } from "date-fns";

// import { convertToLocalDate } from "../components/convertDate";
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

export const EventEditSubItem_DateEnd = ({ eventItem, imgUrl, typeInput }) => {
  const { dispatch } = useEvent();
  const { state } = useEvent();
  const [editDate, setEditDate] = useState(false);
  const [newEnd, setNewEnd] = useState(new Date(eventItem));

  useEffect(() => {
    const editEnd = parseISO(newEnd.toISOString());
    dispatch({ type: ACTIONS.EDIT_START, payload: editEnd });
  }, [state.editStart, newEnd, dispatch, eventItem]);

  const getOutput = (eventItem) => {
    const output = (
      <span>
        {getDate(eventItem).props.children} -{" "}
        {getTime(eventItem).props.children}
      </span>
    );
    return output;
  };

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
            <Stack direction={"column"}>
              <DatePicker
                selectsEnd
                selected={newEnd}
                onChange={(date) => setNewEnd(date)}
                endDate={newEnd}
                startDate={state.editStart}
                minDate={state.editStart}
                showTimeSelect
                dateFormat="dd-MM-yyy HH:mm"
                name="endTime"
              />
            </Stack>
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
