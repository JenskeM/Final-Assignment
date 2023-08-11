import React, { useState, useEffect } from "react";
import { getImageSize } from "react-image-size";
import { EventSubItem } from "../components/EventSubItem";
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
} from "@chakra-ui/react";

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

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  const userToShow = users.find((user) => user.id === event.createdBy);
  const catsArray = [];
  event.categoryIds.map((catId) => {
    const category = categories.find((cat) => cat.id === catId);
    catsArray.push(category.name);
  });
  const catsToShow = catsArray.join(", ");

  const showBgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 201, 127, 0.9), rgba(255, 228, 191, 0.73)), url(${event.image})`,
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
        <Card boxShadow="2xl" m={7} style={showBgStyle}>
          <CardBody>
            <Center>
              <Stack direction={"column"} spacing={"30px"} mb={8}>
                <Stack>
                  <Heading
                    color="brand.100"
                    size="lg"
                    mt={5}
                    textAlign={"center"}
                  >
                    Event information:
                  </Heading>
                  <Heading
                    color="brand.200"
                    size="xl"
                    mt={5}
                    textAlign={"center"}
                  >
                    {" "}
                    {event.title}
                  </Heading>
                </Stack>
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
                <EventSubItem
                  eventItem={event.description}
                  date={null}
                  imgUrl={"/src/assets/Info.png"}
                  alt="Description"
                />
                <EventSubItem
                  eventItem={event.location}
                  date={null}
                  imgUrl={"/src/assets/Location.png"}
                  alt="Location"
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
              </Stack>
            </Center>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={screenSize.width <= 700 ? 1 : 2}>
        <Card boxShadow="2xl" bg="brand.300" m={7}>
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
                    User information:
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
              </Stack>
            </Center>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};
