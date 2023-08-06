import { createContext, useContext, useReducer } from "react";
import eventReducer, { initialState } from "./eventReducer";

const EventContext = createContext(initialState.searchTerm);

console.log("initialState: ", initialState.searchTerm);

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState.searchTerm);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within a EventContext");
  }
  console.log("Current context state:", context.state);
  return context;
};
