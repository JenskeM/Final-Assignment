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
  Select,
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
          <EditablePreview />
          {typeInput === TYPES.TEXTAREA ? (
            <EditableTextarea bg="brand.100" />
          ) : typeInput === TYPES.INPUT ? (
            <EditableInput bg="brand.100" />
          ) : (
            <EditableInput bg="brand.100" />
          )}
        </Editable>
      </Center>
    </Stack>
  );
};
