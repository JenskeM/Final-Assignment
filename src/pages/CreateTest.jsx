import { useLoaderData, redirect, Form } from "react-router-dom";
import {
  Box,
  Grid,
  Heading,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./react-datepicker.css";

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
  const categoryIds = [1, 2, 3];
  const createdBy = 1;
  console.log((formData["categoryIds"] = categoryIds));
  console.log((formData["createdBy"] = createdBy));
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
  const [value, setValue] = React.useState("1");
  const { users } = useLoaderData();
  const [selectedUser, setSelectedUser] = useState();

  return (
    <Box h={"100vh"} pt={5}>
      <Heading mb={10} textAlign={"center"} color={"brand.200"}>
        This is a test
      </Heading>
      <Form method="post" id="new-post-form">
        <Grid
          ml={"500px"}
          mr={"500px"}
          alignItems={"center"}
          justifyContent={"center"}
          gridTemplateColumns={"1fr"}
          rowGap={8}
        >
          <FormControl>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Created by</FormLabel>
              <RadioGroup value={selectedUser} onChange={setSelectedUser}>
                <Stack direction="row">
                  {users.map((user) => {
                    return (
                      <Radio
                        value={user.id}
                        key={user.id}
                        onClick={console.log(selectedUser)}
                      >
                        {user.name}
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </Grid>
          </FormControl>
        </Grid>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            <Radio value="1">First</Radio>
            <Radio value="2">Second</Radio>
            <Radio value="3">Third</Radio>
          </Stack>
        </RadioGroup>
      </Form>
    </Box>
  );
};
