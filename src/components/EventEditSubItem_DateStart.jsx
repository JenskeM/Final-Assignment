import { useState } from "react";
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
  const [editDate, setEditDate] = useState(false);
  const [editStart, setEditStart] = useState(new Date(eventItem));

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
            <DatePicker
              selectStart
              selected={editStart}
              onChange={(date) => setEditStart(date)}
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
