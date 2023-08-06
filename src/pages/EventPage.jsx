import React from "react";
import { Heading } from "@chakra-ui/react";

export const loader = async ({ params }) => {
  const events = await fetch(`http://localhost:3000/events/${params.id}`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);

  return {
    events: await events.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { events, categories, users } = useLoaderData();

  return <Heading>Event</Heading>;
};
