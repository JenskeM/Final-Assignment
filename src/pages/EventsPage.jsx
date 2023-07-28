import React from "react";
import { Heading, Box, Grid } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { EventItemCard } from "../components/EventItemCard";

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
      <Heading textAlign={"center"}>List of events</Heading>
      <Grid
        alignContent={"center"}
        justifyContent={"center"}
        gridTemplateColumns={"repeat(2, 1fr)"}
        columnGap={10}
      >
        {events.map((event) => {
          return <EventItemCard key={event.id} event={event} />;
        })}
      </Grid>
    </Box>
  );
};
