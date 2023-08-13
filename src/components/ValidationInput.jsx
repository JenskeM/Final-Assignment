import { validateDate } from "./validateDate";
import { validateTime } from "./validateTime";
import { validateImage } from "./validateImage";
import { Text } from "@chakra-ui/react";

export const ValidationInput = ({ input, type }) => {
  return (
    ((type === "date" && !validateDate(input)) ||
      (type === "time" && !validateTime(input)) ||
      (type === "image" && !validateImage(input))) && (
      <Text color="darkred" fontSize={"xs"} fontWeight={"semibold"}>
        {type === "image" ? "This" : `*${input}`} is NOT a valid {type}.
      </Text>
    )
  );
};
