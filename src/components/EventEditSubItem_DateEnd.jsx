import { useState } from "react";
import { getTime } from "./getTime";
import { getDate } from "./getDate";
import { ValidationInput } from "./ValidationInput";
import {
  Stack,
  Image,
  Center,
  Tooltip,
  Editable,
  Text,
  Input,
} from "@chakra-ui/react";

export const EventEditSubItem_DateEnd = ({ eventItem, imgUrl, typeInput }) => {
  const [editDate, setEditDate] = useState(false);
  const [endDate, setEndDate] = useState(getDate(eventItem).props.children);
  const [endTime, setEndTime] = useState(getTime(eventItem).props.children);

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
              <Stack direction={"row"}>
                <Input
                  value={endDate}
                  bg="brand.100"
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Input
                  value={endTime}
                  bg="brand.100"
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </Stack>
              <ValidationInput input={endDate} type="date" />
              <ValidationInput input={endTime} type="time" />
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
