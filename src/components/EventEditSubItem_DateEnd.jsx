import { useState, useEffect } from "react";
import { getTime } from "./getTime";
import { getDate } from "./getDate";
import { useEvent } from "../components/EventContext";
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
  const [editEnd, setEditEnd] = useState(new Date(eventItem));
  const [editStart, setEditStart] = useState("");

  useEffect(() => {
    setEditStart(state.editStart);
  }, [state.editStart, eventItem, dispatch]);

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
                selected={editEnd}
                onChange={(date) => setEditEnd(date)}
                endDate={editEnd}
                startDate={editStart}
                minDate={editStart}
                showTimeSelect
                dateFormat="dd-MM-yyy HH:mm"
                name="endTime"
              />
              <Text>{editStart}</Text>
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
