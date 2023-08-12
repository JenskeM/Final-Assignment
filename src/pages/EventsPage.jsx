import React, { useState, useEffect } from "react";
import {
  Heading,
  Box,
  Grid,
  Button,
  Tooltip,
  Center,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventItemCard } from "../components/EventItemCard";
import { useEvent } from "../components/EventContext";
import { ACTIONS } from "../components/eventReducer";

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
  const { dispatch, state } = useEvent();
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [radioValue, setRadioValue] = useState("no filter");

  const eventsBgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(32, 39, 33, 0.9), rgba(0, 52, 0, 0.9), rgba(180, 195, 157, 0.73)), url("src/assets/Background.jpeg")`,
    backgroundSize: "cover",
    color: "white",
    padding: "20px",
  };

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const catsFiltered = ["no filter"];
  categories.map((cat) => {
    catsFiltered.push(cat.name);
  });

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  if (screenSize.width > 700) {
    useEffect(() => {
      dispatch({ type: ACTIONS.FILTER_CATS, payload: radioValue });
    }, [radioValue, dispatch]);
  }

  useEffect(() => {
    if (state.searchTerm === undefined || state.searchTerm === "") {
      if (radioValue === "no filter") {
        setFilteredEvents(events);
      } else {
        const chosenCategory = categories.find(
          (category) => category.name === radioValue
        );
        const eventsWithCategory = events.filter((event) =>
          event.categoryIds.includes(chosenCategory.id)
        );
        setFilteredEvents(eventsWithCategory);
      }
    } else {
      const eventInFilters = events.filter((event) =>
        event.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
      if (radioValue === "no filter") {
        setFilteredEvents(eventInFilters);
      } else {
        const chosenCategory = categories.find(
          (category) => category.name === radioValue
        );
        const eventsWithCategory = eventInFilters.filter((event) =>
          event.categoryIds.includes(chosenCategory.id)
        );
        setFilteredEvents(eventsWithCategory);
      }
    }
  }, [state.searchTerm, events, radioValue]);

  return (
    <Box pl={3} pt={1} pb={10} style={eventsBgStyle}>
      <RadioGroup onChange={setRadioValue} value={radioValue} name="filterCat">
        {catsFiltered.map((cat) => (
          <Radio
            key={cat}
            value={cat}
            pr={5}
            colorScheme="orange"
            sx={{
              borderColor: "brand.200",
              background: "brand.100",
              paddingLeft: "5px",
            }}
          >
            {cat}
          </Radio>
        ))}
      </RadioGroup>
      <Heading textAlign={"center"} color="brand.100" pt={10}>
        The events you want to attend!
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
