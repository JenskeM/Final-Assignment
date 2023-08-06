import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  CreateEventsPage,
  loader as createEventLoader,
  action as createEvent,
} from "./pages/CreateEventPage";
import { EventPage, loader as eventDetailLoader } from "./pages/EventPage";
import { EventsPage, loader as eventListLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

//extend the theme
const colors = {
  brand: {
    100: "#fafafa", //Off-white
    200: "#eb7777", //Darkest pink
    300: "#ffc97f", //Orange-ish
    400: "#eb8291", //Middle pink
    500: "#f0bbcd", //Light pink
    600: "#ffe4bf", //Lighter orange
    700: "#ffedd4", //Lightest orange
  },
};

const fonts = {
  heading: "Nunito",
  body: "Nunito",
};

const theme = extendTheme({
  colors,
  fonts,
  components: { MultiSelect: MultiSelectTheme },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventDetailLoader,
      },
      {
        path: "/createEvent",
        element: <CreateEventsPage />,
        loader: createEventLoader,
        action: createEvent,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
