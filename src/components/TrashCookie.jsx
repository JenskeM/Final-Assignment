import { Box, Image, Center } from "@chakra-ui/react";
import "./trashCookie.css";

export const TrashCookie = ({ screenSize }) => {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(180, 195, 157, 0.73)",
    zIndex: 1000,
  };

  return (
    <Box className="Nocookie-container" style={overlayStyle}>
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
