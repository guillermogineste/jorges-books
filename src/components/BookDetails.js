import React, { useState, useEffect } from "react";
import { VStack, Flex, StackDivider } from "@chakra-ui/react";
import BookDetailsForm from "./BookDetailsForm";
import DetailsFooter from "./DetailsFooter";

const BookDetails = ({
  bookDetails,
  handleDetailChange,
  handleAddBookToList,
  selectedBook,
  errors, 
  setErrors, 
  handleBlur,
  editingBook,
  handleUpdateBook
}) => {
  return (
    <VStack
      spacing={0}
      align="stretch"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.400"
      divider={<StackDivider borderColor="gray.400" />}
      h="full"
      flex="1.6"
      bg="white"
    >
      <Flex direction="column" flexGrow={1} overflowY="scroll">
        <BookDetailsForm
          bookDetails={bookDetails}
          handleDetailChange={handleDetailChange}
          selectedBook={selectedBook}
          errors={errors}
          setErrors={setErrors}
          handleBlur={handleBlur}
        />
      </Flex>
      <DetailsFooter
        bookDetails={bookDetails}
        handleAddBookToList={handleAddBookToList}
        errors={errors}
        editingBook={editingBook}
        handleUpdateBook={handleUpdateBook}
      />
    </VStack>
  );
};

export default BookDetails;
