import React from "react";
import { Heading, Box, Grid } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { EventItemCard } from "../components/EventItemCard";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  return (
    <Box marginLeft={3}>
      <Heading textAlign={"center"}>List of events</Heading>
      <Grid
        alignContent={"center"}
        justifyContent={"center"}
        gridTemplateColumns={"repeat(4, 1fr)"}
        columnGap={8}
      >
        {events.map((event) => {
          // return event.categoryIds.map((e) => {
          //   return console.log(
          //     categories.find((category) => category.id === e)
          //   );
          // });
          return (
            <EventItemCard
              key={event.id}
              event={event}
              categories={event.categoryIds.map((e) => {
                return categories.find((category) => category.id === e);
              })}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
