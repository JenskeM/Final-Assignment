import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Menu } from "../components/Menu";
import { Box, Tooltip, Image } from "@chakra-ui/react";
import { EventProvider } from "./EventContext";

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    categories: await categories.json(),
  };
};

export const Root = () => {
  const { categories } = useLoaderData();
  const [showMenu, setShowMenu] = useState(false);
  const [playMusic, setPlayMusic] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <EventProvider>
      <Box>
        <Navigation toggleMenu={toggleMenu} />
        {showMenu && <Menu categories={categories} />}
        <Outlet />
        <Tooltip
          label={
            playMusic
              ? "Press to turn the music off"
              : "Press to turn the music on"
          }
        >
          <Image
            onClick={() => setPlayMusic(!playMusic)}
            src="/src/assets/Speaker.png"
            h={"35px"}
            bg="brand.100"
            borderRadius={"50%"}
            p={1}
            _hover={{ backgroundColor: "brand.300" }}
            boxShadow={"2xl"}
            position="sticky"
            bottom="40px"
            right="40px"
            zIndex={1000}
          />
        </Tooltip>
      </Box>
    </EventProvider>
  );
};
