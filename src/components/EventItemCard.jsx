import {
  Card,
  CardBody,
  Image,
  Text,
  Stack,
  Heading,
  Tag,
  Center,
} from "@chakra-ui/react";

export const EventItemCard = ({ event }) => {
  return (
    <Card
      mt={8}
      width={["300px", "340px"]}
      boxShadow="2xl"
      bg="white"
      cursor={"pointer"}
      _hover={{
        opacity: 0.6,
        transform: "scale(.95)",
        filter: "auto",
        blur: "0.5px",
      }}
    >
      <CardBody>
        <Center>
          <Image
            src={event.image}
            height={200}
            width={"80%"}
            borderRadius={"xl"}
          />
        </Center>
        <Stack mt="6" spacing="3" alignItems={"center"}>
          <Heading size="md" textAlign={"center"}>
            {event.title}
          </Heading>
          <Stack direction={"row"}>
            <Text color="blue.600" fontSize="sm">
              Description:
            </Text>
            <Text
              color="blue.600"
              fontSize="sm"
              fontWeight={"semibold"}
              textTransform={"capitalize"}
            >
              {" "}
              {event.description}
            </Text>
          </Stack>
        </Stack>
        <Center mt={3}>
          {event.categoryIds.map(
            (category) => (
              <Tag
                key={category}
                size={"sm"}
                maxBlockSize={2}
                bg="purple.100"
                m={2}
                textAlign={"center"}
                color="purple.600"
                fontWeight={"semibold"}
                py={1}
                textTransform={"uppercase"}
              >
                {category}
              </Tag>
            )
            //console.log(label)
          )}
        </Center>
      </CardBody>
    </Card>
  );
};
