import React from "react";
import { Button, Flex } from "@chakra-ui/react";

const DetailsFooter = ({ bookDetails, handleAddBookToList }) => {
  return (
    <Flex p={4} align="stretch">
      <Button
        onClick={() => handleAddBookToList(bookDetails)}
        colorScheme="blue"
        width="100%"
      >
        Añadir libro a la lista
      </Button>
    </Flex>
  );
};

export default DetailsFooter;
