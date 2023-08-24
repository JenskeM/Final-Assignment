import { Box, Image, Center } from "@chakra-ui/react";
import "./trashCookie.css";

export const TrashCookie = ({ screenSize }) => {
  return (
    <Box className="Nocookie-container">
      <div
        className="NoCookie"
        style={{
          left: "45%",
        }}
      ></div>
      <Center>
        <Image
          mt={"20%"}
          src="/src/assets/TrashCan.png"
          zIndex={1000}
          transform={screenSize.width <= 700 && "translate(15px, 180px)"}
        />
      </Center>
    </Box>
  );
};
