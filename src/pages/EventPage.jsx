import React, { useState, useEffect } from "react";
import { getImageSize } from "react-image-size";
import { useLoaderData } from "react-router-dom";
import {
  Heading,
  Center,
  Box,
  Image,
  Stack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Tooltip,
  Editable,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import { EventSubItem } from "../components/EventSubItem";

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

export const TYPES = {
  TEXTAREA: "text-area",
  INPUT: "input",
  DATE: "date",
  SELECT: "select",
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const userToShow = users.find((user) => user.id === event.createdBy);
  const catsArray = [];
  event.categoryIds.map((catId) => {
    const category = categories.find((cat) => cat.id === catId);
    catsArray.push(category.name);
  });
  const catsToShow = catsArray.join(", ");

  const eventBgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 201, 127, 0.9), rgba(255, 228, 191, 0.73)), url(${event.image})`,
    backgroundSize: "cover",
    color: "white",
    padding: "20px",
  };

  const creatorBgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 201, 127, 0.9), rgba(255, 228, 191, 0.73)), url(${userToShow.image})`,
    backgroundSize: "cover",
    color: "white",
    padding: "20px",
  };

  useEffect(() => {
    getImageSize(event.image)
      .then((size) => {
        setImageWidth(size.width);
        setImageHeight(size.height);
      })
      .catch((error) => {
        console.error(
          "Error when catching the measurements form the image:",
          error
        );
      });
  }, [event.image]);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <Grid
      bg="brand.700"
      gridTemplateColumns={screenSize.width <= 700 ? "1fr" : "repeat(6, 1fr)"}
    >
      <GridItem colSpan={screenSize.width <= 700 ? 1 : 4}>
        <Card boxShadow="2xl" m={7} style={eventBgStyle}>
          <CardBody>
            <Stack direction={"column"} spacing={"30px"} mb={8}>
              <Stack>
                <Heading color="brand.100" size="lg" textAlign={"center"}>
                  Event information:
                </Heading>
                <Heading color="brand.200" size="xl" textAlign={"center"}>
                  {" "}
                  {event.title}
                </Heading>
              </Stack>
              <Center>
                {isEditable ? (
                  <Box
                    borderColor="brand.300"
                    borderRadius="full"
                    boxShadow="2xl"
                    h={imageHeight * 0.2}
                    w={imageWidth * 0.2}
                  >
                    <Stack direction={"row"}>
                      <Image
                        src={event.image}
                        borderRadius="full"
                        h={imageHeight * 0.2}
                        w={imageWidth * 0.2}
                        alt={event.title}
                      />
                      <Tooltip label="Change the image url">
                        <Editable color="black" defaultValue={event.image}>
                          <EditablePreview />
                          <EditableTextarea
                            bg="brand.100"
                            w={"200px"}
                            h={imageHeight * 0.2}
                          />
                        </Editable>
                      </Tooltip>
                    </Stack>
                  </Box>
                ) : (
                  <Box
                    borderColor="brand.300"
                    borderRadius="full"
                    boxShadow="2xl"
                    h={imageHeight * 0.2}
                    w={imageWidth * 0.2}
                  >
                    <Image
                      src={event.image}
                      borderRadius="full"
                      h={imageHeight * 0.2}
                      w={imageWidth * 0.2}
                      alt={event.title}
                    />
                  </Box>
                )}
              </Center>
              <Grid
                gridTemplateColumns={
                  screenSize.width <= 700 ? "1fr" : "repeat(2, 1fr)"
                }
                gap={screenSize.width <= 700 ? 2 : 8}
                p={"25px 150px 25px 150px"}
                bg={"rgba(255, 228, 191, 0.35)"}
              >
                <EventSubItem
                  eventItem={event.description}
                  date={null}
                  imgUrl={"/src/assets/Info.png"}
                  alt="Description"
                  isEditable={isEditable}
                  typeInput={TYPES.TEXTAREA}
                />{" "}
                <EventSubItem
                  eventItem={event.location}
                  date={null}
                  imgUrl={"/src/assets/Location.png"}
                  alt="Location"
                  isEditable={isEditable}
                  typeInput={TYPES.INPUT}
                />
                <EventSubItem
                  eventItem={[event.startTime, event.endTime]}
                  date={"date"}
                  imgUrl={"/src/assets/Calendar.png"}
                  alt="Date"
                />
                <EventSubItem
                  eventItem={catsToShow}
                  date={null}
                  imgUrl={"/src/assets/Categories.png"}
                  alt="Categories"
                />
              </Grid>
            </Stack>
          </CardBody>
          <Stack direction={"row"}>
            {isEditable ? (
              <Stack direction={"row"}>
                <Tooltip label={"Press to save the editions"}>
                  <Image
                    src={"/src/assets/Check.png"}
                    h={10}
                    w={10}
                    p={2}
                    bg="brand.400"
                    borderRadius="full"
                    _hover={{
                      opacity: 0.6,
                      transform: "scale(.95)",
                      filter: "auto",
                      blur: "0.5px",
                    }}
                    onClick={() => setIsEditable(!isEditable)}
                  />
                </Tooltip>
                <Tooltip label={"Press to cancel the edit"}>
                  <Image
                    src={"/src/assets/Cancel.png"}
                    h={10}
                    w={10}
                    p={2}
                    bg="brand.400"
                    borderRadius="full"
                    _hover={{
                      opacity: 0.6,
                      transform: "scale(.95)",
                      filter: "auto",
                      blur: "0.5px",
                    }}
                    onClick={() => setIsEditable(!isEditable)}
                  />
                </Tooltip>
              </Stack>
            ) : (
              <Tooltip label={"Press to edit this event"}>
                <Image
                  src={"/src/assets/Edit.png"}
                  h={10}
                  w={10}
                  p={2}
                  bg="brand.400"
                  borderRadius="full"
                  _hover={{
                    opacity: 0.6,
                    transform: "scale(.95)",
                    filter: "auto",
                    blur: "0.5px",
                  }}
                  onClick={() => setIsEditable(!isEditable)}
                />
              </Tooltip>
            )}
            <Tooltip label={"Press to delete this event"}>
              <Image
                src={"/src/assets/Delete.png"}
                h={10}
                w={10}
                p={2}
                bg="brand.400"
                borderRadius="full"
                _hover={{
                  opacity: 0.6,
                  transform: "scale(.95)",
                  filter: "auto",
                  blur: "0.5px",
                }}
              />
            </Tooltip>
          </Stack>
        </Card>
      </GridItem>
      <GridItem colSpan={screenSize.width <= 700 ? 1 : 2}>
        <Card boxShadow="2xl" m={7} style={creatorBgStyle}>
          <CardBody>
            <Center>
              <Stack direction={"column"} spacing={"30px"} mb={"100px"}>
                <Stack>
                  <Heading
                    color="brand.100"
                    size="lg"
                    mt={5}
                    textAlign={"center"}
                  >
                    Creator information:
                  </Heading>
                  <Heading
                    color="brand.200"
                    size="xl"
                    mt={5}
                    textAlign={"center"}
                  >
                    {" "}
                    {userToShow.name}
                  </Heading>
                </Stack>
                <Center>
                  <Box
                    borderColor="brand.300"
                    borderRadius="full"
                    boxShadow="xl"
                    h={imageHeight * 0.15}
                    w={imageWidth * 0.15}
                  >
                    <Image
                      src={userToShow.image}
                      borderRadius="full"
                      alt={userToShow.name}
                    />
                  </Box>
                </Center>
              </Stack>
            </Center>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};
