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

export const EventItemCard = ({ event, categories }) => {
  const getDate = (dateToChange) => {
    const dateObject = new Date(dateToChange);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const formattedDate = `${day}-${month}-${year}`;

    return <>{formattedDate}</>;
  };

  const getTime = (timeToChange) => {
    const dateObject = new Date(timeToChange);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    return <>{formattedTime}</>;
  };

  return (
    <Card
      mt={8}
      width={["300px", "340px"]}
      boxShadow="2xl"
      bg="brand.300"
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
          <Heading size="md" textAlign={"center"} color="brand.200">
            {event.title}
          </Heading>
          <Stack direction={"row"}>
            <Text color="brand.600" fontSize="sm">
              Description:
            </Text>
            <Text
              color="brand.100"
              fontSize="sm"
              fontWeight={"semibold"}
              textTransform={"capitalize"}
            >
              {" "}
              {event.description}
            </Text>
          </Stack>
          <Stack direction={"row"} color="brand.600" fontSize="sm">
            <Text>Date:</Text>
            <Text color="brand.100" fontSize="sm" fontWeight={"semibold"}>
              {" "}
              {getDate(event.startTime).props.children ===
              getDate(event.endTime).props.children
                ? getDate(event.startTime)
                : `${getDate(event.startTime)} - ${getDate(event.endTime)}`}
            </Text>
          </Stack>
          <Stack direction={"row"} color="brand.600" fontSize="sm">
            <Text>Time:</Text>
            <Text color="brand.100" fontSize="sm" fontWeight={"semibold"}>
              {" "}
              {getTime(event.startTime)}-{getTime(event.endTime)}
            </Text>
          </Stack>
        </Stack>
        <Center mt={3}>
          {categories.map((category) => (
            <Tag
              key={category}
              size={"sm"}
              maxBlockSize={2}
              bg="brand.100"
              m={2}
              textAlign={"center"}
              color="brand.600"
              fontWeight={"semibold"}
              py={1}
              textTransform={"uppercase"}
            >
              {category.name}
            </Tag>
          ))}
        </Center>
      </CardBody>
    </Card>
  );
};
