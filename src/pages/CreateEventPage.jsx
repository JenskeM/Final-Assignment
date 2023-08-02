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
  Button,
  Center,
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
  const categoryIds = [1, 2, 3];
  const newFormData = (formData["categoryIds"] = categoryIds);
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(newFormData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newId}`);
};

export const CreateEventsPage = () => {
  const { categories, users } = useLoaderData();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const categoriesOptions = Object.entries(categories).map(([key, value]) => ({
    value: value.name,
    label: value.name,
    key: key,
  }));

  const chosenCategories = [];

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
          <FormControl>
            <Grid gridTemplateColumns={"110px 300px"} alignItems={"center"}>
              <FormLabel>Created by</FormLabel>
              <RadioGroup>
                <HStack spacing="24px">
                  {users.map((user) => {
                    return (
                      <Radio
                        //value={user.id}
                        key={user.id}
                        colorScheme="red"
                        name="createdBy"
                      >
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
                  name="categoryIds"
                />
                {/* {console.log(selectedCategories)} */}
                {selectedCategories.map((e) => {
                  return chosenCategories.push(
                    categories.find((category) => category.name === e).id
                  );
                })}
                {console.log(chosenCategories)}
              </FormControl>
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid
              gridTemplateColumns={"110px 180px 180px"}
              alignItems={"center"}
            >
              <FormLabel>Date/Time</FormLabel>
              <div style={{ fontSize: "0.9em" }}>
                <DatePicker
                  selectStart
                  selected={startDateTime}
                  onChange={(date) => setStartDateTime(date)}
                  showTimeSelect
                  dateFormat=" d MMM yy h:mmaa"
                  name="startTime"
                />
              </div>
              <div style={{ fontSize: "0.9em" }}>
                <DatePicker
                  selectsEnd
                  selected={endDateTime}
                  onChange={(date) => setEndDateTime(date)}
                  endDate={endDateTime}
                  startDate={startDateTime}
                  minDate={startDateTime}
                  showTimeSelect
                  dateFormat=" d MMM yy h:mmaa"
                  name="endTime"
                />
              </div>
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
