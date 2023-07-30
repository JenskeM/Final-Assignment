import { useLoaderData, redirect, Form } from "react-router-dom";
import { MultiSelect } from "chakra-multiselect";
import {
  Box,
  Grid,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  RadioGroup,
  HStack,
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { categories, users } = useLoaderData();
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const categoriesOptions = Object.entries(categories).map(([key, value]) => ({
    value: value.name,
    label: value.name,
    key: key,
  }));

  const handleMultiselectChange = (selected) => {
    setSelectedCategories(selected);
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
              <Input type="text" bg={"brand.100"} />
            </Grid>
            <FormHelperText ml="110px">Make it a fancy one.</FormHelperText>
          </FormControl>
          <FormControl>
            <Grid gridTemplateColumns={"110px 300px"}>
              <FormLabel>Description</FormLabel>
              <Textarea
                bg={"brand.100"}
                placeholder="Please, add some info of the event"
              />
            </Grid>
          </FormControl>
          <FormControl>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Image url</FormLabel>
              <Input bg={"brand.100"} />
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Location</FormLabel>
              <Input bg={"brand.100"} />
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Created by</FormLabel>
              <RadioGroup>
                <HStack spacing="24px">
                  {users.map((user) => {
                    return (
                      <Radio value={user.name} key={user.id} colorScheme="red">
                        {user.name}
                      </Radio>
                    );
                  })}
                </HStack>
              </RadioGroup>
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Category</FormLabel>
              <FormControl bg={"brand.100"} rounded="md">
                <MultiSelect
                  options={categoriesOptions}
                  value={selectedCategories}
                  onChange={handleMultiselectChange}
                />
                {/* {console.log(selectedCategories)} */}
              </FormControl>
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid
              gridTemplateColumns={"110px 200px 200px"}
              alignItems={"center"}
            >
              <FormLabel>Date and Time</FormLabel>
              <DatePicker
                selectStart
                selected={startDateTime}
                onChange={(date) => setStartDateTime(date)}
                showTimeSelect
                dateFormat="d, MMM, yyyy h:mmaa"
              />

              <DatePicker
                fontSize="10px"
                selectsEnd
                selected={endDateTime}
                onChange={(date) => setEndDateTime(date)}
                endDate={endDateTime}
                startDate={startDateTime}
                minDate={startDateTime}
                showTimeSelect
                dateFormat="d, MMM, yyyy h:mmaa"
              />
            </Grid>
          </FormControl>
        </Grid>
      </Form>
    </Box>
  );
};