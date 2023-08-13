import { EventEditSubItem } from "../components/EventEditSubItem";
import { EventShowSubItem } from "../components/EventShowSubItem";

export const EventSubItem = ({
  isEditable,
  eventItem,
  imgUrl,
  date,
  typeInput,
  onGrandChildChange,
}) => {
  return (
    <>
      {isEditable ? (
        <EventEditSubItem
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
          onGrandChildChange={onGrandChildChange}
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
