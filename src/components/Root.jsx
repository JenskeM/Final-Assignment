import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Menu } from "../components/Menu";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Box>
      <Navigation toggleMenu={toggleMenu} />
      {showMenu && <Menu />}
      <Outlet />
    </Box>
  );
};
