import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Menu } from "../components/Menu";
import { Box, Image, Text, Button, Stack, Flex } from "@chakra-ui/react";
import { EventProvider } from "./EventContext";
import { Footer } from "./Footer";
import { PopUp } from "./PopUp";

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    categories: await categories.json(),
  };
};

export const Root = () => {
  const { categories } = useLoaderData();
  const [showMenu, setShowMenu] = useState(false);
  const [showCookies, setShowCookies] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <EventProvider>
      <PopUp
        show={showCookies}
        onClose={() => setShowCookies(false)}
        height={"25%"}
        borderRad={"20px"}
      >
        <Flex direction={"row"} alignItems={"center"}>
          <Image
            src="/src/assets/CookieMonster.png"
            h={"300px"}
            style={{ transform: "translate(-20%)" }}
          />
          <Stack
            direction={"column"}
            mt={5}
            style={{ transform: "translate(-10%)" }}
          >
            <Text color="brand.200" textAlign={"center"}>
              Do you also want some cookies?
            </Text>
            <Stack direction={"row"} pt={5}>
              <Button bg="brand.600" _hover={{ backgroundColor: "brand.300" }}>
                Mmmm, yes please!
              </Button>
              <Button
                bg="brand.600"
                _hover={{ backgroundColor: "brand.300" }}
                onClick={() => setShowCookies(false)}
              >
                No thanks, I am full
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </PopUp>
      <Box>
        <Navigation toggleMenu={toggleMenu} />
        {showMenu && <Menu categories={categories} />}
        <Outlet />
        <Footer />
      </Box>
    </EventProvider>
  );
};
