import { validateDate } from "./validateDate";
import { validateTime } from "./validateTime";
import { validateImage } from "./validateImage";
import { Text } from "@chakra-ui/react";

export const ValidationInput = ({ input, type }) => {
  return type === "date" && !validateDate(input) ? (
    <Text color="darkred" fontSize={"xs"} fontWeight={"semibold"}>
      *{input} is NOT a valid date.
    </Text>
  ) : type === "time" && !validateTime(input) ? (
    <Text color="darkred" fontSize={"xs"} fontWeight={"semibold"}>
      *{input} is NOT a valid time.
    </Text>
  ) : (
    type === "image" &&
    !validateImage(input) && (
      <Text color="darkred" fontSize={"xs"} fontWeight={"semibold"}>
        *This is NOT a valid image url.
      </Text>
    )
  );
};
