import { Box, Image, Center } from "@chakra-ui/react";
import "./trashCookie.css";

export const TrashCookie = () => {
  return (
    <Box className="Nocookie-container">
      <div
        className="NoCookie"
        style={{
          left: "45%",
        }}
      ></div>
      <Center>
        <Image mt={"20%"} src="/src/assets/TrashCan.png" zIndex={1000} />
      </Center>
    </Box>
  );
};
