import { validateDate } from "./validateDate";
import { validateTime } from "./validateTime";
import { validateImage } from "./validateImage";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useEvent } from "./EventContext";
import { ACTIONS } from "./eventReducer";
import { VALIDATION_TYPES } from "./EventEditSubItem";

export const ValidationInput = ({ input, type }) => {
  const { dispatch } = useEvent();
  const [saveToggle, setSaveToggle] = useState(true);

  useEffect(() => {
    if (type === VALIDATION_TYPES.DATE && !validateDate(input)) {
      setSaveToggle(false);
    } else if (type === VALIDATION_TYPES.TIME && !validateTime(input)) {
      setSaveToggle(false);
    } else if (type === VALIDATION_TYPES.IMG && !validateImage(input)) {
      setSaveToggle(false);
    } else {
      setSaveToggle(true);
    }
    dispatch({ type: ACTIONS.SHOW_SAVE, payload: saveToggle });
  }, [saveToggle, dispatch, input]);

  return (
    ((type === VALIDATION_TYPES.DATE && !validateDate(input)) ||
      (type === VALIDATION_TYPES.TIME && !validateTime(input)) ||
      (type === VALIDATION_TYPES.IMG && !validateImage(input))) && (
      <Text
        color="darkred"
        fontSize={type === VALIDATION_TYPES.IMG ? "md" : "xs"}
        fontWeight={"semibold"}
      >
        {type === VALIDATION_TYPES.IMG ? "This" : `*${input}`} is NOT a valid{" "}
        {type} {type === VALIDATION_TYPES.IMG && "url"}.
      </Text>
    )
  );
};
