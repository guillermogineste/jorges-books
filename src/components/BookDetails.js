import React from "react";
import { VStack, Flex, StackDivider } from "@chakra-ui/react";
import BookDetailsForm from "./BookDetailsForm";
import DetailsFooter from "./DetailsFooter";

const BookDetails = ({
  bookDetails,
  handleDetailChange,
  handleAddBookToList,
  selectedBook,
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
      flex="1"
      bg="white"
    >
      <Flex direction="column" flexGrow={1} overflowY="scroll">
        <BookDetailsForm
          bookDetails={bookDetails}
          handleDetailChange={handleDetailChange}
          selectedBook={selectedBook}
        />
      </Flex>
      <DetailsFooter
        bookDetails={bookDetails}
        handleAddBookToList={handleAddBookToList}
      />
    </VStack>
  );
};

export default BookDetails;
