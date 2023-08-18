import React, { useState, useEffect } from "react";
import { getImageSize } from "react-image-size";
import { useLoaderData } from "react-router-dom";
import { useEvent } from "../components/EventContext";
import { EventSubItem } from "../components/EventSubItem";
import { ValidationInput } from "../components/ValidationInput";
import {
  Heading,
  Center,
  Box,
  Image,
  Stack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Tooltip,
  Editable,
  EditableInput,
  EditablePreview,
  Radio,
  useToast,
} from "@chakra-ui/react";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const TYPES = {
  TITLE: "title",
  DESCRIPTION: "Description",
  LOCATION: "Location",
  DATE: "Date",
  CATEGORIES: "Categories",
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const { state } = useEvent();
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [editCreator, setEditCreator] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(event.createdBy);
  const [imageUrl, setImageUrl] = useState(event.image);
  const [showSave, setShowSave] = useState(true);
  const [newTitle, setNewTitle] = useState(event.title);
  const [newDescr, setNewDescr] = useState(event.description);
  const [newLoc, setNewLoc] = useState(event.location);
  const [newCats, setNewCats] = useState(event.categoryIds);
  const [newStart, setNewStart] = useState(event.startTime);
  const [newEnd, setNewEnd] = useState(event.endTime);
  const userToShow = users.find((user) => user.id === event.createdBy);
  const catsToShow = [];
  event.categoryIds.map((catId) => {
    const category = categories.find((cat) => cat.id === catId);
    catsToShow.push(category.name);
  });

  const eventBgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(180, 195, 157, 0.63),  rgba(250, 245, 233, 0.9)), url(${event.image})`,
    backgroundSize: "cover",
  };

  const creatorBgStyle = {
    backgroundImage: `linear-gradient(to bottom,  rgba(180, 195, 157, 0.63),  rgba(250, 245, 233, 0.9)), url(${userToShow.image})`,
    backgroundSize: "cover",
  };

  const toast = useToast();
  const handleClick = () => {
    setIsEditable(!isEditable);
    toast({
      title: "Edit time!",
      description: `Click on the item you want to edit🖱️. 
                        An inputfield or checkbox will appear.
                        Happy with all the changes? Press the Save-button in the bottom left corner.
                        You changed your mind? No worries! Just click on the Cancel-button in the bottom left corner `,
      duration: 6000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (state.saveToggle) {
      if (
        state.editTitle === "" ||
        state.editLoc === "" ||
        state.editCats === [] ||
        state.editStart === "" ||
        state.editEnd === ""
      ) {
        setShowSave(false);
      } else {
        setShowSave(true);
      }
    } else {
      setShowSave(false);
    }
  }, [state.saveToggle]);

  useEffect(() => {
    setNewTitle(state.editTitle);
    setNewDescr(state.editDescription);
    setNewLoc(state.editLoc);
    setNewCats(state.editCats);
    setNewStart(state.editStart);
    setNewEnd(state.editEnd);
  }, [
    state.editTitle,
    state.editDescription,
    state.editLoc,
    state.editCats,
    state.editStart,
    state.editEnd,
  ]);

  useEffect(() => {
    getImageSize(event.image)
      .then((size) => {
        setImageWidth(size.width);
        setImageHeight(size.height);
      })
      .catch((error) => {
        console.error(
          "Error when catching the measurements form the image:",
          error
        );
      });
  }, [event.image]);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const handleSubmit = async () => {
    const updatedEventData = {
      title: newTitle,
      description: newDescr,
      image: imageUrl,
      location: newLoc,
      createdBy: selectedCreator,
      categoryIds: newCats,
      startTime: newStart,
      endTime: newEnd,
    };
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEventData),
      });

      setIsEditable(!isEditable);
      if (response.ok) {
        toast({
          title: "Succes!😄",
          description: `The event is succesfully edited.`,
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Failure....!!😭",
          description: `An error has occurred.`,
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("An error has occurred ", error);
    }
  };

  return (
    <Grid
      gridTemplateColumns={screenSize.width <= 700 ? "1fr" : "repeat(6, 1fr)"}
      h={isEditable && "100vh"}
      bg="linear-gradient(to bottom, rgba(32, 39, 33, 0.9), rgba(0, 52, 0, 0.9), rgba(180, 195, 157, 0.73))"
    >
      <GridItem colSpan={screenSize.width <= 700 ? 1 : 4}>
        <Card boxShadow="2xl" m={7} style={eventBgStyle}>
          <CardBody>
            <Heading>{newTitle}</Heading>
            <Heading>{newStart}</Heading>
            {/* {console.log(newCats, newLoc)} */}
            <Stack direction={"column"} spacing={"30px"} mb={8}>
              <Stack>
                <Heading color="brand.100" size="lg" textAlign={"center"}>
                  Event information:
                </Heading>
                <Heading color="brand.200" size="xl" textAlign={"center"}>
                  {" "}
                  <Center>
                    <EventSubItem
                      eventItem={event.title}
                      imgUrl={null}
                      isEditable={isEditable}
                      typeInput={TYPES.TITLE}
                    />
                  </Center>
                </Heading>
              </Stack>
              <Center>
                {isEditable ? (
                  <Editable
                    textAlign={"center"}
                    color="black"
                    defaultValue={imageUrl}
                  >
                    <EditablePreview cursor={"crosshair"} />
                    <EditableInput
                      bg="brand.100"
                      w={"50vw"}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <ValidationInput input={imageUrl} type="image" />
                  </Editable>
                ) : (
                  <Box
                    borderColor="brand.300"
                    borderRadius="full"
                    boxShadow="2xl"
                    h={imageHeight * 0.2}
                    w={imageWidth * 0.2}
                  >
                    <Image
                      src={event.image}
                      borderRadius="full"
                      h={imageHeight * 0.2}
                      w={imageWidth * 0.2}
                      alt={event.title}
                    />
                  </Box>
                )}
              </Center>
              <Grid
                gridTemplateColumns={
                  screenSize.width <= 700 ? "1fr" : "repeat(2, 1fr)"
                }
                gap={screenSize.width <= 700 ? 2 : 8}
                p={"25px 150px 25px 150px"}
                bg={"rgba(250, 245, 233, 0.5)"}
              >
                <EventSubItem
                  eventItem={event.description}
                  imgUrl={"/src/assets/Info.png"}
                  isEditable={isEditable}
                  typeInput={TYPES.DESCRIPTION}
                />{" "}
                <EventSubItem
                  eventItem={event.location}
                  imgUrl={"/src/assets/Location.png"}
                  isEditable={isEditable}
                  typeInput={TYPES.LOCATION}
                />
                <EventSubItem
                  eventItem={[event.startTime, event.endTime]}
                  imgUrl={"/src/assets/Calendar.png"}
                  isEditable={isEditable}
                  typeInput={TYPES.DATE}
                />
                <EventSubItem
                  eventItem={isEditable ? event.categoryIds : catsToShow}
                  imgUrl={"/src/assets/Categories.png"}
                  isEditable={isEditable}
                  typeInput={TYPES.CATEGORIES}
                />
              </Grid>
            </Stack>
          </CardBody>
          <Stack direction={"row"}>
            {isEditable ? (
              <Stack direction={"row"} ml={2} mb={2}>
                {showSave && (
                  <Tooltip label={"Press to save the editions"}>
                    <Image
                      src={"/src/assets/Check.png"}
                      h={10}
                      w={10}
                      p={2}
                      bg="brand.600"
                      borderRadius="full"
                      _hover={{
                        opacity: 0.6,
                        transform: "scale(.95)",
                        filter: "auto",
                        blur: "0.5px",
                      }}
                      onClick={() => handleSubmit()}
                    />
                  </Tooltip>
                )}
                <Tooltip label={"Press to cancel the edit"}>
                  <Image
                    src={"/src/assets/Cancel.png"}
                    h={10}
                    w={10}
                    p={2}
                    bg="brand.600"
                    borderRadius="full"
                    _hover={{
                      opacity: 0.6,
                      transform: "scale(.95)",
                      filter: "auto",
                      blur: "0.5px",
                    }}
                    onClick={() => setIsEditable(!isEditable)}
                  />
                </Tooltip>
              </Stack>
            ) : (
              <Tooltip label={"Press to edit this event"}>
                <Image
                  src={"/src/assets/Edit.png"}
                  h={10}
                  w={10}
                  p={2}
                  ml={2}
                  mb={2}
                  bg="brand.600"
                  borderRadius="full"
                  _hover={{
                    opacity: 0.6,
                    transform: "scale(.95)",
                    filter: "auto",
                    blur: "0.5px",
                  }}
                  onClick={handleClick}
                />
              </Tooltip>
            )}
            <Tooltip label={"Press to delete this event"}>
              <Image
                src={"/src/assets/Delete.png"}
                h={10}
                w={10}
                p={2}
                bg="brand.600"
                borderRadius="full"
                _hover={{
                  opacity: 0.6,
                  transform: "scale(.95)",
                  filter: "auto",
                  blur: "0.5px",
                }}
              />
            </Tooltip>
          </Stack>
        </Card>
      </GridItem>
      <GridItem colSpan={screenSize.width <= 700 ? 1 : 2}>
        <Card boxShadow="2xl" m={7} style={creatorBgStyle}>
          <CardBody>
            <Center>
              <Stack direction={"column"} spacing={"30px"} mb={"100px"}>
                <Stack>
                  <Heading
                    color="brand.100"
                    size="lg"
                    mt={5}
                    textAlign={"center"}
                  >
                    Creator information:
                  </Heading>

                  {isEditable ? (
                    editCreator ? (
                      <Stack spacing={3}>
                        {users.map((user) => {
                          return (
                            <Radio
                              value={user.id}
                              key={user.id}
                              colorScheme="orange"
                              isChecked={selectedCreator === user.id}
                              onClick={() => setSelectedCreator(user.id)}
                              name="createdBy"
                              sx={{
                                borderColor: "brand.200",
                                background: "brand.100",
                                paddingLeft: "5px",
                              }}
                            >
                              {user.name}
                            </Radio>
                          );
                        })}
                      </Stack>
                    ) : (
                      <Heading
                        color="brand.200"
                        size="xl"
                        mt={5}
                        textAlign={"center"}
                        cursor={"crosshair"}
                        onClick={() => setEditCreator(!editCreator)}
                      >
                        {userToShow.name}
                      </Heading>
                    )
                  ) : (
                    <Heading
                      color="brand.200"
                      size="xl"
                      mt={5}
                      textAlign={"center"}
                    >
                      {userToShow.name}
                    </Heading>
                  )}
                </Stack>
                <Center>
                  <Box
                    borderColor="brand.300"
                    borderRadius="full"
                    boxShadow="xl"
                    h={imageHeight * 0.15}
                    w={imageWidth * 0.15}
                  >
                    <Image
                      src={userToShow.image}
                      borderRadius="full"
                      alt={userToShow.name}
                    />
                  </Box>
                </Center>
              </Stack>
            </Center>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};
