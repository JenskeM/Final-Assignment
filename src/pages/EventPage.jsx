import React from "react";
import { useLoaderData } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/event/6}`);
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
    <>
      <Heading>Test</Heading>
      {event && console.log(event)}
    </>
  );
};
