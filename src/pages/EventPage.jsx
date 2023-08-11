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
  Tag,
  Text,
  Grid,
  GridItem,
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
      <GridItem colSpan={screenSize.width <= 700 ? 1 : 3}>
        <Center>
          <Stack direction={"column"} spacing={"30px"} mb={8}>
            <Stack>
              <Heading color="brand.400" size="lg" mt={5} textAlign={"center"}>
                Event information:
              </Heading>
              <Heading color="brand.200" size="xl" mt={5} textAlign={"center"}>
                {" "}
                {event.title}
              </Heading>
            </Stack>
            <Box
              mt={5}
              borderColor="brand.300"
              borderRadius="full"
              boxShadow="xl"
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
              property="Description"
              date={null}
            />
            <EventSubItem
              eventItem={event.location}
              property="Location"
              date={null}
            />
            <EventSubItem
              eventItem={event.startTime}
              property="Start date and time"
              date={"date"}
            />
            <EventSubItem
              eventItem={event.endTime}
              property="End date and time"
              date={"date"}
            />
            <Stack direction="column">
              <Text
                as="b"
                textAlign={"center"}
                color="brand.400"
                bgGradient={"radial(brand.100, brand.700)"}
              >
                Categories
              </Text>
              <Center mt={3}>
                {event.categoryIds.map((catId) => {
                  const category = categories.find((cat) => cat.id === catId);
                  return (
                    <Tag
                      key={catId}
                      size={"sm"}
                      maxBlockSize={2}
                      bg="brand.700"
                      textAlign={"center"}
                      fontWeight={"semibold"}
                      py={1}
                      textTransform={"uppercase"}
                    >
                      {category.name}
                    </Tag>
                  );
                })}
              </Center>
            </Stack>
          </Stack>
        </Center>
      </GridItem>
    </Grid>
  );
};
