import { EventEditSubItem } from "../components/EventEditSubItem";
import { EventShowSubItem } from "../components/EventShowSubItem";

export const EventSubItem = ({
  isEditable,
  eventItem,
  imgUrl,
  date,
  alt,
  typeInput,
}) => {
  return (
    <>
      {isEditable ? (
        <EventEditSubItem
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
        />
      ) : (
        <EventShowSubItem
          eventItem={eventItem}
          date={date}
          imgUrl={imgUrl}
          alt={alt}
        />
      )}{" "}
    </>
  );
};
