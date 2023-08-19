import { EventEditSubItem_DateEnd } from "./EventEditSubItem_DateEnd";
import { EventEditSubItem_DateStart } from "./EventEditSubItem_DateStart";
import { EventEditSubItem_Cats } from "../components/EventEditSubItem_Cats";
import { EventEditSubItem_Loc } from "../components/EventEditSubItem_Loc";
import { EventEditSubItem_Descr } from "../components/EventEditSubItem_Descr";
import { EventEditSubItem_Title } from "../components/EventEditSubItem_Title";
import { EventShowSubItem } from "../components/EventShowSubItem";
import { TYPES } from "../pages/EventPage";
import "./mouse.css";

export const EventSubItem = ({
  isEditable,
  eventItem,
  imgUrl,
  date,
  typeInput,
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
        <EventEditSubItem_Title eventItem={eventItem} className="edit-mouse" />
      ) : typeInput === TYPES.DESCRIPTION ? (
        <EventEditSubItem_Descr
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
        />
      ) : typeInput === TYPES.LOCATION ? (
        <EventEditSubItem_Loc
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
        />
      ) : typeInput === TYPES.CATEGORIES ? (
        <EventEditSubItem_Cats
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
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
