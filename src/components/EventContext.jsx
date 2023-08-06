import { createContext, useContext, useReducer } from "react";
import eventReducer, { initialState } from "./eventReducer";

const EventContext = createContext(initialState);

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
    throw new Error("useEventContext must be used within a EventContext");
  }
  return context;
};
