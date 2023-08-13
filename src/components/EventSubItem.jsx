import { EventEditSubItem } from "../components/EventEditSubItem";
import { EventShowSubItem } from "../components/EventShowSubItem";

export const EventSubItem = ({
  isEditable,
  eventItem,
  imgUrl,
  date,
  typeInput,
  currentEvent,
  // parentCallback,
}) => {
  return (
    <>
      {isEditable ? (
        <EventEditSubItem
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
          currentEvent={currentEvent}
          // parentCallback={parentCallback}
        />
      ) : (
        <EventShowSubItem
          eventItem={eventItem}
          date={date}
          imgUrl={imgUrl}
          typeInput={typeInput}
        />
      )}{" "}
    </>
  );
};
