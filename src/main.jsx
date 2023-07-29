import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { CreateEventsPage } from "./pages/CreateEventPage";
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

const theme = extendTheme({ colors, fonts });

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
