import React, { useState } from "react";
import { Tooltip, Image, Flex, Text } from "@chakra-ui/react";

export const Footer = () => {
  const [playMusic, setPlayMusic] = useState(true);

  return (
    <Flex
      bg={"brand.500"}
      p={2}
      justify={{ base: "center", md: "space-between" }}
      align={{ base: "center", md: "center" }}
    >
      <Text color={"brand.100"}>
        © 2023 JM Productions. All rights reserved
      </Text>
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
          h={"30px"}
          bg="brand.100"
          borderRadius={"50%"}
          p={1}
          _hover={{ backgroundColor: "brand.300" }}
          boxShadow={"2xl"}
          position="absolute"
          right="20px"
          zIndex={1000}
        />
      </Tooltip>
    </Flex>
  );
};
