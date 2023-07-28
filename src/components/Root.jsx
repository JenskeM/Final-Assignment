import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box bg="brand.300" height={"100vh"}>
      <Navigation />
      <Outlet />
    </Box>
  );
};
