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
  Checkbox,
  Stack,
  Radio,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
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
  formData.createdBy = Number(formData.createdBy);
  formData.categoryIds = formData.categoryIds.split(",").map(Number);
  const getArrayStart = formData.startTime.split(" ");
  const revertDateStart = getArrayStart[0].split("-").reverse().join("-");
  formData.startTime = revertDateStart + "T" + getArrayStart[1] + ":00.000Z";
  const getArrayEnd = formData.endTime.split(" ");
  const revertDateEnd = getArrayEnd[0].split("-").reverse().join("-");
  formData.endTime = revertDateEnd + "T" + getArrayEnd[1] + ":00.000Z";
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
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [marginLR, setMarginLR] = useState();
  const [transX, setTransX] = useState();
  const toast = useToast();

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const toggleCategory = (categoryId) => {
    if (selectedCategories.has(categoryId)) {
      selectedCategories.delete(categoryId);
    } else {
      selectedCategories.add(categoryId);
    }
    setSelectedCategories(new Set(selectedCategories));
  };

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);
    changeMarginLR();
    changeX();

    return () => {
      window.removeEventListener("resize", updateDimension);
      changeMarginLR();
      changeX();
    };
  }, [screenSize]);

  const changeMarginLR = () => {
    setMarginLR((screenSize.width - 110 - 300) / 2);
    //110 is the width of the labels in the form
    //300 is the width of the controls in the form
  };

  const changeX = () => {
    setTransX((screenSize.width - 300) / 2);
  };

  return (
    <Box bg={"brand.600"} pt={5} pb={"200px"}>
      <Heading mb={10} textAlign={"center"} color={"brand.200"}>
        Add a new event
      </Heading>
      <Form method="post" id="new-post-form">
        <Grid
          ml={[0, `${marginLR}px`]}
          mr={[0, `${marginLR}px`]}
          alignItems={"center"}
          justifyContent={"center"}
          gridTemplateColumns={"1fr"}
          rowGap={8}
          sx={{
            transform: screenSize.width <= 360 && `translateX(${transX}px)`,
          }}
        >
          <FormControl isRequired>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 360 ? 300 : "110px 300px"
              }
              alignItems={"center"}
            >
              <FormLabel>Title</FormLabel>
              <Input type="text" bg={"brand.100"} name="title" />
            </Grid>
            <FormHelperText ml={screenSize.width <= 360 ? 0 : 110}>
              Make it a fancy one.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 360 ? "300px" : "110px 300px"
              }
            >
              <FormLabel>Description</FormLabel>
              <Textarea
                bg={"brand.100"}
                placeholder="Please, add some info of the event"
                name="description"
              />
            </Grid>
          </FormControl>
          <FormControl>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 360 ? 300 : "110px 300px"
              }
              alignItems={"center"}
            >
              <FormLabel>Image url</FormLabel>
              <Input bg={"brand.100"} name="image" />
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 360 ? 300 : "110px 300px"
              }
              alignItems={"center"}
            >
              <FormLabel>Location</FormLabel>
              <Input bg={"brand.100"} name="location" />
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 360 ? 300 : "110px 300px"
              }
              alignItems={"center"}
            >
              <FormLabel>Created by</FormLabel>
              <Stack spacing={3}>
                {users.map((user) => {
                  return (
                    <Radio
                      value={user.id}
                      key={user.id}
                      colorScheme="orange"
                      isChecked={selectedUser === user.id}
                      onClick={() => setSelectedUser(user.id)}
                      name="createdBy"
                      sx={{
                        borderColor: "brand.200",
                        background: "brand.100",
                        paddingLeft: "5px",
                      }}
                    >
                      {user.name}
                    </Radio>
                  );
                })}
              </Stack>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 360 ? 300 : "110px 300px"
              }
              alignItems={"center"}
            >
              <FormLabel>Category</FormLabel>
              <Stack>
                {categories.map((category) => {
                  return (
                    <Checkbox
                      colorScheme="orange"
                      key={category.id}
                      name="categoryIds"
                      value={Array.from(selectedCategories)}
                      isChecked={selectedCategories.has(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      sx={{
                        borderColor: "brand.200",
                        backgroundColor: "brand.100",
                        paddingLeft: "5px",
                        borderRadius: "20px",
                      }}
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
              gridTemplateColumns={
                screenSize.width <= 360 ? 300 : "110px 300px"
              }
              alignItems={"center"}
            >
              <FormLabel>Start</FormLabel>
              <div style={{ fontSize: "0.9em" }}>
                <DatePicker
                  selectStart
                  selected={startDateTime}
                  onChange={(date) => setStartDateTime(date)}
                  showTimeSelect
                  dateFormat="dd-MM-yyy HH:mm"
                  name="startTime"
                  width="300px"
                />
              </div>
            </Grid>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 360 ? 300 : "110px 300px"
              }
              alignItems={"center"}
            >
              <FormLabel>End</FormLabel>
              <div style={{ fontSize: "0.9em" }}>
                <DatePicker
                  selectsEnd
                  selected={endDateTime}
                  onChange={(date) => setEndDateTime(date)}
                  endDate={endDateTime}
                  startDate={startDateTime}
                  minDate={startDateTime}
                  showTimeSelect
                  dateFormat="dd-MM-yyy HH:mm"
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
            onClick={() =>
              toast({
                title: "Whoop whoop! Done 🎉!",
                description: "The event you created is added.",
                status: "success",
                duration: 3000,
                isClosable: true,
              })
            }
          >
            Add event
          </Button>
        </Center>
      </Form>
    </Box>
  );
};
