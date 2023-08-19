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

export const EventEditSubItem_DateStart = ({
  eventItem,
  imgUrl,
  typeInput,
}) => {
  const [editDate, setEditDate] = useState(false);
  const [startDate, setStartDate] = useState(getDate(eventItem).props.children);
  const [startTime, setStartTime] = useState(getTime(eventItem).props.children);

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

              <ValidationInput input={startDate} type="date" />
              <ValidationInput input={startTime} type="time" />
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
