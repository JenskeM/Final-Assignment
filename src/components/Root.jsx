import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Menu } from "../components/Menu";
import { Box } from "@chakra-ui/react";
import { EventProvider } from "./EventContext";
import { Footer } from "./Footer";

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    categories: await categories.json(),
  };
};

export const Root = () => {
  const { categories } = useLoaderData();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <EventProvider>
      <Box>
        <Navigation toggleMenu={toggleMenu} />
        {showMenu && <Menu categories={categories} />}
        <Outlet />
        <Footer />
      </Box>
    </EventProvider>
  );
};
