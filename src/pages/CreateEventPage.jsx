import { useLoaderData, redirect, Form } from "react-router-dom";
import {
  Box,
  Grid,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Button,
  Center,
  GridItem,
  Checkbox,
  Stack,
  Radio,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
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
  // const categoryIds = [1, 2, 3];
  // const createdBy = 1;
  // const newFormData1 = (formData["categoryIds"] = categoryIds);
  // const newFormData2 = (formData["createdBy"] = createdBy);
  console.log(formData);
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
  const { categories, users } = useLoaderData();
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedUser, setSelectedUser] = useState();
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const toggleCategory = (categoryId) => {
    if (selectedCategories.has(categoryId)) {
      selectedCategories.delete(categoryId);
    } else {
      selectedCategories.add(categoryId);
    }
    setSelectedCategories(new Set(selectedCategories));
  };

  return (
    <Box bg={"brand.600"} h={"100vh"} pt={5}>
      <Heading mb={10} textAlign={"center"} color={"brand.200"}>
        Add a new event
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
          <FormControl isRequired>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Title</FormLabel>
              <Input type="text" bg={"brand.100"} name="title" />
            </Grid>
            <FormHelperText ml="110px">Make it a fancy one.</FormHelperText>
          </FormControl>
          <FormControl>
            <Grid gridTemplateColumns={"110px 300px"}>
              <FormLabel>Description</FormLabel>
              <Textarea
                bg={"brand.100"}
                placeholder="Please, add some info of the event"
                name="description"
              />
            </Grid>
          </FormControl>
          <FormControl>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Image url</FormLabel>
              <Input bg={"brand.100"} name="image" />
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Location</FormLabel>
              <Input bg={"brand.100"} name="location" />
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Created by</FormLabel>

              <Stack spacing={3}>
                {users.map((user) => {
                  return (
                    <Radio
                      value={user.id}
                      key={user.id}
                      isChecked={selectedUser === user.id}
                      onClick={() => setSelectedUser(user.id)}
                    >
                      {user.name}
                    </Radio>
                  );
                })}
              </Stack>
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Category</FormLabel>
              <Stack>
                {categories.map((category) => {
                  return (
                    <Checkbox
                      key={category.id}
                      isChecked={selectedCategories.has(category.id)}
                      onChange={() => toggleCategory(category.id)}
                    >
                      {category.name}
                    </Checkbox>
                  );
                })}
              </Stack>
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid
              gridTemplateColumns={"110px 300px"}
              gridTemplateRows={"1fr 1fr"}
              alignItems={"center"}
            >
              <FormLabel>Date/Time</FormLabel>
              <div style={{ fontSize: "0.9em" }}>
                <DatePicker
                  selectStart
                  selected={startDateTime}
                  onChange={(date) => setStartDateTime(date)}
                  showTimeSelect
                  dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
                  name="startTime"
                  width="300px"
                />
              </div>
              <GridItem colStart={2}>
                <div style={{ fontSize: "0.9em" }}>
                  <DatePicker
                    selectsEnd
                    selected={endDateTime}
                    onChange={(date) => setEndDateTime(date)}
                    endDate={endDateTime}
                    startDate={startDateTime}
                    minDate={startDateTime}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
                    name="endTime"
                  />
                </div>
              </GridItem>
            </Grid>
          </FormControl>
        </Grid>
        <Center>
          <Button
            type="submit"
            mt={10}
            bg="brand.200"
            color="brand.100"
            _hover={{ background: "brand.300" }}
          >
            Add event
          </Button>
        </Center>
      </Form>
    </Box>
  );
};
