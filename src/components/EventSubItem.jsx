import { EventEditSubItem } from "../components/EventEditSubItem";
import { EventShowSubItem } from "../components/EventShowSubItem";

export const EventSubItem = ({
  isEditable,
  eventItem,
  imgUrl,
  date,
  alt,
  type,
}) => {
  {
    isEditable ? (
      <EventEditSubItem eventItem={eventItem} imgUrl={imgUrl} type={type} />
    ) : (
      <EventShowSubItem
        eventItem={eventItem}
        date={date}
        imgUrl={imgUrl}
        alt={alt}
      />
    );
  }
};
