import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { TYPES } from "../pages/EventPage";
import { getTime } from "./getTime";
import { getDate } from "./getDate";
import { ValidationInput } from "./ValidationInput";
import {
  Stack,
  Image,
  Center,
  Tooltip,
  Editable,
  EditableTextarea,
  EditableInput,
  EditablePreview,
  Checkbox,
  Text,
  Input,
} from "@chakra-ui/react";

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    categories: await categories.json(),
  };
};

export const EventEditSubItem = ({ eventItem, imgUrl, typeInput }) => {
  const { categories } = useLoaderData();
  const [editDescription, setEditDescription] = useState(eventItem);
  const [editLocation, setEditLocation] = useState(eventItem);

  const [editCats, setEditCats] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(eventItem)
  );
  const toggleCategory = (categoryId) => {
    if (selectedCategories.has(categoryId)) {
      selectedCategories.delete(categoryId);
    } else {
      selectedCategories.add(categoryId);
    }
    setSelectedCategories(new Set(selectedCategories));
  };
  const catsToShow = [];

  const [editDate, setEditDate] = useState(false);
  const [startDate, setStartDate] = useState(
    getDate(eventItem[0]).props.children
  );
  const [startTime, setStartTime] = useState(
    getTime(eventItem[0]).props.children
  );
  const [endDate, setEndDate] = useState(getDate(eventItem[1]).props.children);
  const [endTime, setEndTime] = useState(getTime(eventItem[1]).props.children);
  const getOutput = (eventItem) => {
    const output = (
      <span>
        {getDate(eventItem[0]).props.children} -{" "}
        {getTime(eventItem[0]).props.children} <br />
        until
        <br />
        {getDate(eventItem[1]).props.children} -{" "}
        {getTime(eventItem[1]).props.children}
      </span>
    );
    return output;
  };

  return (
    <Stack direction="row">
      <Center>
        {typeInput !== TYPES.CREATOR && (
          <Tooltip label={typeInput}>
            <Image
              src={imgUrl}
              height={10}
              p={2}
              bg="brand.200"
              borderRadius="full"
              mr={5}
              alt={typeInput}
            />
          </Tooltip>
        )}
        <Editable textAlign={"center"} color="black" defaultValue={eventItem}>
          {typeInput === TYPES.DESCRIPTION ? (
            <>
              <EditablePreview cursor={"crosshair"} />
              <EditableTextarea
                bg="brand.100"
                value={editDescription}
                onChange={(e) => {
                  setEditDescription(e.target.value);
                }}
              />
            </>
          ) : typeInput === TYPES.LOCATION ? (
            <>
              <EditablePreview cursor={"crosshair"} />
              <EditableInput
                bg="brand.100"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
              />
            </>
          ) : typeInput === TYPES.CATEGORIES ? (
            <Stack direction={"row"}>
              {editCats ? (
                categories.map((category) => {
                  const isChecked = selectedCategories.has(category.id);

                  return (
                    <Checkbox
                      colorScheme="orange"
                      key={category.id}
                      name="categoryIds"
                      value={Array.from(selectedCategories)}
                      onChange={() => toggleCategory(category.id)}
                      isChecked={isChecked}
                      sx={{
                        borderColor: "brand.200",
                        backgroundColor: "brand.100",
                        paddingLeft: "5px",
                        borderRadius: "20px",
                      }}
                    >
                      {category.name}
                    </Checkbox>
                  );
                })
              ) : (
                <Text
                  cursor={"crosshair"}
                  onClick={() => setEditCats(!editCats)}
                >
                  {eventItem.map((catId) => {
                    const category = categories.find((cat) => cat.id === catId);
                    catsToShow.push(category.name);
                  })}

                  {catsToShow.join(", ")}
                </Text>
              )}
            </Stack>
          ) : editDate ? (
            <Stack direction={"column"}>
              <Stack direction={"row"}>
                <Input
                  value={startDate}
                  bg="brand.100"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                  value={startTime}
                  bg="brand.100"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </Stack>
              <Stack direction={"row"}>
                <Input
                  value={endDate}
                  bg="brand.100"
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Input
                  value={endTime}
                  bg="brand.100"
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </Stack>
              <ValidationInput input={startDate} type="date" />
              <ValidationInput input={startTime} type="time" />
              <ValidationInput input={endDate} type="date" />
              <ValidationInput input={endTime} type="time" />
            </Stack>
          ) : (
            <Text cursor={"crosshair"} onClick={() => setEditDate(!editDate)}>
              {getOutput(eventItem)}
            </Text>
          )}
        </Editable>
      </Center>
    </Stack>
  );
};
