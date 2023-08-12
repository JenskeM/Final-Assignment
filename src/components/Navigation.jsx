import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useEvent } from "./EventContext";
import { ACTIONS } from "./eventReducer";
import {
  Grid,
  GridItem,
  Text,
  Tooltip,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";

export const Navigation = ({ toggleMenu }) => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dispatch } = useEvent();
  const [searchText, setSearchText] = useState("");

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

  useEffect(() => {
    dispatch({ type: ACTIONS.FILTER_EVENTS, payload: searchText });
  }, [searchText, dispatch]);

  return (
    <Grid
      bg="brand.500"
      templateColumns={
        screenSize.width <= 700 ? "repeat(6, 1fr)" : "repeat(11, 1fr)"
      }
      templateRows={1}
      height={8}
      fontSize="xl"
      color="brand.100"
      boxShadow={"base"}
    >
      <GridItem
        colSpan={screenSize.width <= 700 ? 4 : 6}
        fontWeight={"bold"}
        paddingLeft={3}
      >
        <Text alignSelf={"center"}>The event to attend</Text>
      </GridItem>
      {screenSize.width <= 700 ? (
        <GridItem colSpan={2} justifySelf={"right"} pr={2}>
          <Image
            src="/src/assets/Menu.png"
            height={8}
            p={1}
            _hover={{
              background: "brand.300",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              toggleMenu(setIsMenuOpen(!isMenuOpen));
            }}
          />
          {/* {console.log(isMenuOpen)} */}
        </GridItem>
      ) : (
        <>
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
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
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
        </>
      )}
    </Grid>
  );
};
