import { useState } from "react";
import { useLoaderData, redirect, Form } from "react-router-dom";
import {
  Box,
  Grid,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
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
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";

  return (
    <Box bg={"brand.600"} h={"100vh"}>
      <Heading mb={10} textAlign={"center"} color={"brand.200"} pt={10}>
        Add a new event
      </Heading>
      <Form method="post" id="new-post-form">
        <FormControl>
          <Grid
            ml={"500px"}
            mr={"500px"}
            alignContent={"center"}
            justifyContent={"center"}
            gridTemplateColumns={"1fr 5fr"}
            columnGap={2}
          >
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              width={"100%"}
              bg={"brand.100"}
            />
            {!isError ? (
              <FormHelperText>Make it a fancy one.</FormHelperText>
            ) : (
              <FormErrorMessage>Title is required.</FormErrorMessage>
            )}
          </Grid>
        </FormControl>
      </Form>
    </Box>
  );
};
