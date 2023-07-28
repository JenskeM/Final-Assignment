import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);

  return {
    events: await events.json(),
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();

  return (
    <Box marginLeft={3}>
      <Heading>List of events</Heading>

      {events.map((event) => {
        return <li key={event.id}>{event.title}</li>;
      })}
    </Box>
  );
};
