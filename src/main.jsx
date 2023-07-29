import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  CreateEventsPage,
  loader as createEventLoader,
} from "./pages/CreateEventPage";
import { EventPage } from "./pages/EventPage";
import { EventsPage, loader as eventListLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

//extend the theme
const colors = {
  brand: {
    100: "#fafafa",
    200: "#eb7777",
    300: "#ffc97f",
    400: "#eb8291",
    500: "#f0bbcd",
    600: "#c9e7db",
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
      },
      {
        path: "/createEvent",
        element: <CreateEventsPage />,
        loader: createEventLoader,
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
