import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { TYPES } from "../pages/EventPage";
import { getTime } from "./getTime";
import { getDate } from "./getDate";
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
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(eventItem)
  );
  const [editCats, setEditCats] = useState(false);
  const [editDate, setEditDate] = useState(false);

  const toggleCategory = (categoryId) => {
    if (selectedCategories.has(categoryId)) {
      selectedCategories.delete(categoryId);
    } else {
      selectedCategories.add(categoryId);
    }
    setSelectedCategories(new Set(selectedCategories));
  };

  const catsToShow = [];

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
              <EditableTextarea bg="brand.100" />
            </>
          ) : typeInput === TYPES.LOCATION ? (
            <>
              <EditablePreview cursor={"crosshair"} />
              <EditableInput bg="brand.100" />
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
                  value={getDate(eventItem[0]).props.children}
                  bg="brand.100"
                />
                <Input
                  value={getTime(eventItem[0]).props.children}
                  bg="brand.100"
                />
              </Stack>
              <Stack direction={"row"}>
                <Input
                  value={getDate(eventItem[1]).props.children}
                  bg="brand.100"
                />
                <Input
                  value={getTime(eventItem[1]).props.children}
                  bg="brand.100"
                />
              </Stack>
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
