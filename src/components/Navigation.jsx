import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  GridItem,
  Text,
  Tooltip,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Grid
      bg="brand.200"
      templateColumns="repeat(11, 1fr)"
      templateRows={1}
      height={8}
      fontSize="xl"
      color="brand.100"
      boxShadow={"base"}
    >
      <GridItem colSpan={6} fontWeight={"bold"} paddingLeft={3}>
        <Text alignSelf={"center"}>The event to attend</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Stack direction={"row"} height={8}>
          <Input
            type="text"
            placeholder="Search..."
            bg="brand.100"
            height={6}
            mt={1}
            mb={1}
            fontSize={"sm"}
            color="black"
            focusBorderColor="brand.300"
          />
          <Tooltip label="Click to search">
            <Image
              src="/src/assets/Search.png"
              height={8}
              p={1}
              alignSelf={"center"}
              _hover={{
                background: "brand.300",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Stack>
      </GridItem>
      <GridItem colSpan={1}></GridItem>
      <GridItem colSpan={2}>
        <Grid templateColumns={"1fr 1fr"} templateRows={1} gap={1}>
          <Tooltip label="Go to the list of events">
            <Text height={8} _hover={{ color: "brand.600" }}>
              <Link to="/">Events</Link>
            </Text>
          </Tooltip>
          <Tooltip label="Go to an event">
            <Text height={8} _hover={{ color: "brand.600" }}>
              <Link to="/event/1">Event</Link>
            </Text>
          </Tooltip>
        </Grid>
      </GridItem>
    </Grid>
  );
};
