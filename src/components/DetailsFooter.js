import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

const DetailsFooter = ({ bookDetails, handleAddBookToList, errors, editingBook, handleUpdateBook }) => {
  const hasErrors = Object.values(errors).some(error => typeof error === 'string' && error);

  return (
    <Flex p={4} align="center" flexDir={"column"}>
      {hasErrors && (
        <Text color="red.500" mb={2} fontSize="sm">
          Corrige los errores antes de guardar
        </Text>
      )}
      <Button
        onClick={() => editingBook ? handleUpdateBook(bookDetails) : handleAddBookToList(bookDetails)}
        colorScheme="blue"
        width="100%"
        isDisabled={hasErrors}
        maxW={"300px"}
      >
        {editingBook ? 'Guardar cambios' : 'Añadir libro a la lista'}
      </Button>
    </Flex>
  );
};

export default DetailsFooter;
