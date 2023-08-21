import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Menu } from "../components/Menu";
import { Box, Image, Text, Button, Stack, Flex } from "@chakra-ui/react";
import { EventProvider } from "./EventContext";
import { Footer } from "./Footer";
import { PopUp } from "./PopUp";
import { CookiesShower } from "./CookiesShower";
import "./cookies.css";

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    categories: await categories.json(),
  };
};

export const Root = () => {
  const { categories } = useLoaderData();
  const [showMenu, setShowMenu] = useState(false);
  const [ShowPopup, setShowPopup] = useState(true);
  const [showCookies, setShowCookies] = useState(false);

  const handleYes = () => {
    setShowCookies(true);
    setShowPopup(false);
  };

  if (showCookies) {
    setTimeout(() => {
      setShowCookies(false);
    }, 10000);
  }

  return (
    <EventProvider>
      <PopUp
        show={ShowPopup}
        onClose={() => setShowPopup(false)}
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
              <Button
                bg="brand.600"
                _hover={{ backgroundColor: "brand.300" }}
                onClick={handleYes}
              >
                Mmmm, yes please!
              </Button>
              <Button
                bg="brand.600"
                _hover={{ backgroundColor: "brand.300" }}
                onClick={() => setShowPopup(false)}
              >
                No thanks, I am full
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </PopUp>
      {showCookies && <CookiesShower show />}
      <Box>
        <Navigation toggleMenu={() => setShowMenu(!showMenu)} />
        {showMenu && <Menu categories={categories} />}
        <Outlet />
        <Footer />
      </Box>
    </EventProvider>
  );
};
