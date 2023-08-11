import {
  Stack,
  Image,
  Center,
  Tooltip,
  Editable,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";

export const EventEditSubItem = ({ eventItem, imgUrl, alt }) => {
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
          <EditableTextarea bg="brand.100" />
        </Editable>
      </Center>
    </Stack>
  );
};
