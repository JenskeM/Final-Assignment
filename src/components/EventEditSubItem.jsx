import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { TYPES } from "../pages/EventPage";
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
} from "@chakra-ui/react";

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);

  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventEditSubItem = ({ eventItem, imgUrl, alt, typeInput }) => {
  const { categories, users } = useLoaderData();
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

  return (
    <Stack direction="row">
      <Center>
        <Tooltip label={alt}>
          <Image
            src={imgUrl}
            height={10}
            p={2}
            bg="brand.200"
            borderRadius="full"
            mr={5}
            alt={alt}
          />
        </Tooltip>
        <Editable textAlign={"center"} color="black" defaultValue={eventItem}>
          {typeInput === TYPES.DESCRIPTION ? (
            <>
              <EditablePreview />
              <EditableTextarea bg="brand.100" />
            </>
          ) : typeInput === TYPES.LOCATION ? (
            <>
              <EditablePreview />
              <EditableInput bg="brand.100" />
            </>
          ) : (
            <Stack direction={"row"}>
              {categories.map((category) => {
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
              })}
            </Stack>
          )}
        </Editable>
      </Center>
    </Stack>
  );
};
