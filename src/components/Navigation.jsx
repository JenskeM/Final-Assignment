import React from "react";
import { Link } from "react-router-dom";
import { Grid, GridItem, Text, Tooltip } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Grid
      bg="brand.100"
      templateColumns="repeat(8, 1fr)"
      templateRows={1}
      marginBottom={10}
      height={8}
      fontSize="xl"
      color="brand.200"
      boxShadow={"base"}
    >
      <GridItem colSpan={6} fontWeight={"bold"} paddingLeft={3}>
        <Text> My Event App</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Grid templateColumns={"1fr 1fr"} templateRows={1} gap={1}>
          <Tooltip label="Go to the list of events">
            <Text height={8} _hover={{ color: "blue.300" }}>
              <Link to="/">Events</Link>
            </Text>
          </Tooltip>
          <Tooltip label="Go to an event">
            <Text height={8} _hover={{ color: "blue.300" }}>
              <Link to="/event/1">Event</Link>
            </Text>
          </Tooltip>
        </Grid>
      </GridItem>
    </Grid>
  );
};
