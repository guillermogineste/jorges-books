import React from "react";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";

const DetailsFooter = ({
  bookDetails,
  handleAddBookToList,
  errors,
  editingBook,
  handleUpdateBook,
  handleDiscardChanges
}) => {
  const hasErrors = Object.values(errors).some(error => typeof error === 'string' && error);

  return (
    <Flex p={4} align="center" flexDir={"column"}>
      {hasErrors && (
        <Text color="red.500" mb={2} fontSize="sm">
          Corrige los errores antes de guardar
        </Text>
      )}
      <HStack gap={2}>
      <Button
        onClick={() => editingBook ? handleUpdateBook(bookDetails) : handleAddBookToList(bookDetails)}
        colorScheme="blue"
        flex="2"
        isDisabled={hasErrors}
        maxW={"300px"}
      >
        {editingBook ? 'Guardar cambios' : 'Añadir libro a la lista'}
      </Button>
      {editingBook && (
        <Button
          colorScheme="gray"
          onClick={handleDiscardChanges}
          flex="1"
        >
          Descartar
        </Button>
      )}
      </HStack>

    </Flex>
  );
};

export default DetailsFooter;
