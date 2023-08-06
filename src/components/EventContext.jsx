import { createContext, useContext, useReducer } from "react";

export const EventContext = createContext();

const initialState = {
  searchTerm: "",
};

export const ACTIONS = {
  FILTER_EVENTS: "filter-events",
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FILTER_EVENTS:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error(
      "useEventContext must be used within a EventContextProvider"
    );
  }
  return context;
};
