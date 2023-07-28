import React from "react";
import { Link } from "react-router-dom";
import { Grid, GridItem, Text } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Grid
      bg="brand.400"
      templateColumns="repeat(8, 1fr)"
      templateRows={1}
      marginBottom={10}
      height={8}
      fontSize="xl"
      color="brand.100"
    >
      <GridItem colSpan={6} fontWeight={"bold"} paddingLeft={2}>
        <Text> My Event App</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Grid templateColumns={"1fr 1fr"} templateRows={1} gap={1}>
          <Link to="/">Events</Link>
          <Link to="/event/1">Event</Link>
        </Grid>
      </GridItem>
    </Grid>
  );
};
