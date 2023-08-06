import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Stack, Input, Image, Text } from "@chakra-ui/react";
import { useEvent } from "./EventContext";
import { ACTIONS } from "./eventReducer";

export const Menu = (categories) => {
  const { dispatch } = useEvent();
  const [searchText, setSearchText] = useState("");

  console.log(categories.categories);

  useEffect(() => {
    dispatch({ type: ACTIONS.FILTER_EVENTS, payload: searchText });
  }, [searchText, dispatch]);

  return (
    <Stack bg="brand.200" pl={4} pr={4} space={2}>
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
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
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
      </Stack>
      <Text height={8} _hover={{ color: "brand.600" }} color="brand.100">
        <Link to="/">Events</Link>
      </Text>
      <Text height={8} _hover={{ color: "brand.600" }} color="brand.100">
        <Link to="/event/1">Event</Link>
      </Text>
    </Stack>
  );
};
