import React from "react";
import { EventSubItem } from "../components/EventSubItem";
import { useLoaderData } from "react-router-dom";
import {
  Heading,
  Center,
  Box,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();

  return (
    <Center bg="brand.700">
      <Stack direction={"column"} spacing={"30px"} mb={8}>
        <Box
          mt={5}
          borderColor="brand.300"
          borderWidth={"10px"}
          borderRadius="100%"
          boxShadow="xl"
        >
          <Image
            src={event.image}
            borderRadius="full"
            boxSize="200px"
            alt={event.title}
          />
        </Box>
        <Heading color="brand.200">{event.title}</Heading>
        <EventSubItem
          eventItem={event.description}
          property="Description"
          date={null}
        />
        <EventSubItem
          eventItem={event.location}
          property="Location"
          date={null}
        />
        <EventSubItem
          eventItem={event.startTime}
          property="Start date and time"
          date={"date"}
        />
        <EventSubItem
          eventItem={event.endTime}
          property="End date and time"
          date={"date"}
        />
        <Stack direction="column">
          <Text
            as="b"
            textAlign={"center"}
            color="brand.400"
            bgGradient={"radial(brand.100, brand.700)"}
          >
            Categories
          </Text>
          <Center mt={3}>
            {event.categoryIds.map((catId) => {
              const category = categories.find((cat) => cat.id === catId);
              return (
                <Tag
                  key={catId}
                  size={"sm"}
                  maxBlockSize={2}
                  bg="brand.700"
                  textAlign={"center"}
                  fontWeight={"semibold"}
                  py={1}
                  textTransform={"uppercase"}
                >
                  {category.name}
                </Tag>
              );
            })}
          </Center>
        </Stack>
      </Stack>
    </Center>
  );
};
