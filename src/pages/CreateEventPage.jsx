import { useLoaderData, redirect, Form } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);
  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newId}`);
};

export const CreateEventsPage = () => {
  // const { categories, users } = useLoaderData();

  return (
    <Box bg={"brand.600"} h={"100vh"} pt={5}>
      <Heading mb={10} textAlign={"center"} color={"brand.200"}>
        Add a new event
      </Heading>
      <Form method="post" id="new-post-form">
        <FormControl>
          <Flex
            ml={"500px"}
            mr={"500px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <FormLabel>Title</FormLabel>
            <Spacer />
            <Flex direction={"column"}>
              <Input type="text" width={"100%"} bg={"brand.100"} />
              <FormHelperText colspan={5}>Make it a fancy one.</FormHelperText>
            </Flex>
          </Flex>
        </FormControl>
      </Form>
    </Box>
  );
};
