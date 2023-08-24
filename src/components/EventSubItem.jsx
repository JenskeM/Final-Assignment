import { EventEditSubItem_DateEnd } from "./EventEditSubItems/EventEditSubItem_DateEnd";
import { EventEditSubItem_DateStart } from "./EventEditSubItems/EventEditSubItem_DateStart";
import { EventEditSubItem_Cats } from "./EventEditSubItems/EventEditSubItem_Cats";
import { EventEditSubItem_Loc } from "./EventEditSubItems/EventEditSubItem_Loc";
import { EventEditSubItem_Descr } from "./EventEditSubItems/EventEditSubItem_Descr";
import { EventEditSubItem_Title } from "./EventEditSubItems/EventEditSubItem_Title";
import { EventShowSubItem } from "../components/EventShowSubItem";
import { TYPES } from "../pages/EventPage";

export const EventSubItem = ({
  isEditable,
  eventItem,
  imgUrl,
  date,
  typeInput,
  width,
  direction,
}) => {
  return (
    <>
      {!isEditable ? (
        <EventShowSubItem
          eventItem={eventItem}
          date={date}
          imgUrl={imgUrl}
          typeInput={typeInput}
        />
      ) : typeInput === TYPES.TITLE ? (
        <EventEditSubItem_Title eventItem={eventItem} />
      ) : typeInput === TYPES.DESCRIPTION ? (
        <EventEditSubItem_Descr
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
          width={width}
        />
      ) : typeInput === TYPES.LOCATION ? (
        <EventEditSubItem_Loc
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
          width={width}
        />
      ) : typeInput === TYPES.CATEGORIES ? (
        <EventEditSubItem_Cats
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
          direction={direction}
        />
      ) : typeInput === TYPES.DATE_START ? (
        <EventEditSubItem_DateStart
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
        />
      ) : (
        typeInput === TYPES.DATE_END && (
          <EventEditSubItem_DateEnd
            eventItem={eventItem}
            imgUrl={imgUrl}
            typeInput={typeInput}
          />
        )
      )}
    </>
  );
};
