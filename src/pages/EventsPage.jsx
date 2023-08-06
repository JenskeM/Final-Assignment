import React, { useState, useEffect } from "react";
import { Heading, Box, Grid, Button, Tooltip, Center } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventItemCard } from "../components/EventItemCard";
import { useEventContext } from "../components/EventContext";

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
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const { state } = useEventContext();
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <Box pl={3} pt={10} bg="brand.700" pb={10}>
      <Heading textAlign={"center"} color="brand.400">
        List of events
      </Heading>
      <Center>
        <Grid
          alignContent={"center"}
          justifyContent={"center"}
          gridTemplateColumns={
            screenSize.width <= 700
              ? "1fr"
              : screenSize.width <= 1060
              ? "repeat(2, 1fr)"
              : screenSize.width <= 1366
              ? "repeat(3, 1fr)"
              : "repeat(4, 1fr)"
          }
          columnGap={8}
        >
          {filteredEvents &&
            filteredEvents.map((event) => {
              return (
                <Link key={event.id} to={`/event/${event.id}`}>
                  <EventItemCard
                    event={event}
                    categories={event.categoryIds.map((e) => {
                      return categories.find((category) => category.id === e);
                    })}
                    screenSize={screenSize}
                  />
                </Link>
              );
            })}
        </Grid>
      </Center>
      <Center pt={6}>
        <Tooltip label={"Press the button to go to add-event-form"}>
          <Link to={`/createEvent`}>
            <Button
              mt={5}
              bg={"brand.400"}
              color={"brand.100"}
              boxShadow={"xl"}
              _hover={{ backgroundColor: "brand.600" }}
            >
              Create new event
            </Button>
          </Link>
        </Tooltip>
      </Center>
    </Box>
  );
};
