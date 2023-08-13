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

export const EventEditSubItem_Dates = ({ eventItem, imgUrl, typeInput }) => {
  const [editDate, setEditDate] = useState(false);
  const [startDate, setStartDate] = useState(
    getDate(eventItem[0]).props.children
  );
  const [startTime, setStartTime] = useState(
    getTime(eventItem[0]).props.children
  );
  const [endDate, setEndDate] = useState(getDate(eventItem[1]).props.children);
  const [endTime, setEndTime] = useState(getTime(eventItem[1]).props.children);

  const getOutput = (eventItem) => {
    const output = (
      <span>
        {getDate(eventItem[0]).props.children} -{" "}
        {getTime(eventItem[0]).props.children} <br />
        until
        <br />
        {getDate(eventItem[1]).props.children} -{" "}
        {getTime(eventItem[1]).props.children}
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
                  value={startDate}
                  bg="brand.100"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                  value={startTime}
                  bg="brand.100"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </Stack>
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
              <ValidationInput input={startDate} type="date" />
              <ValidationInput input={startTime} type="time" />
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
