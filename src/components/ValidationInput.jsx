import { validateDate } from "./validateDate";
import { validateTime } from "./validateTime";
import { validateImage } from "./validateImage";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useEvent } from "./EventContext";
import { ACTIONS } from "./eventReducer";

export const ValidationInput = ({ input, type }) => {
  const { dispatch } = useEvent();
  const [saveToggle, setSaveToggle] = useState(true);

  useEffect(() => {
    if (type === "date" && !validateDate(input)) {
      setSaveToggle(false);
    } else if (type === "time" && !validateTime(input)) {
      setSaveToggle(false);
    } else if (type === "image" && !validateImage(input)) {
      setSaveToggle(false);
    }
    dispatch({ type: ACTIONS.SHOW_SAVE, payload: saveToggle });
  }, [saveToggle, dispatch, input]);

  return (
    ((type === "date" && !validateDate(input)) ||
      (type === "time" && !validateTime(input)) ||
      (type === "image" && !validateImage(input))) && (
      <Text
        color="darkred"
        fontSize={type === "image" ? "md" : "xs"}
        fontWeight={"semibold"}
      >
        {type === "image" ? "This" : `*${input}`} is NOT a valid {type}{" "}
        {type === "image" && "url"}.
      </Text>
    )
  );
};
