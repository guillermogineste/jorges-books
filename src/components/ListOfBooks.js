import React, { useState } from "react";
import {
  Button,
  Heading,
  VStack,
  StackDivider,
  Text,
  Card,
  Stack,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

const ListOfBooks = ({ booksList, onDeleteBook }) => {
  const handleExport = () => {
    const headers =
      "Book ID\tISBN\tListing Type\tTitle\tAuthor\tIllustrator\tKeywords\tBook Condition\tJacket Condition\tBinding Type\tLanguage\tSignature Type\tEdition\tPrinting\tVolume\tPublisher\tPublisher Year\tPublisher Place\tSize\tWeight\tWeight Units\tPage Count\tInventory Location\tQuantity\tStatus\tPrice\tCost\tDescription\tSynopsis\tPrivate Notes\tCategories\tCatalogs\n";

    const data = booksList
      .map(
        (book) =>
          `${book.book_id || ""}\t${book.isbn || ""}\t${
            book.listing_type || ""
          }\t${book.title || ""}\t${book.author || ""}\t${
            book.illustrator || ""
          }\t${book.keywords || ""}\t${book.book_condition || ""}\t${
            book.jacket_condition || ""
          }\t${book.binding_type || ""}\t${book.language || ""}\t${
            book.signature_type || ""
          }\t${book.edition || ""}\t${book.printing || ""}\t${
            book.volume || ""
          }\t${book.publisher || ""}\t${book.publisher_year || ""}\t${
            book.publisher_place || ""
          }\t${book.size || ""}\t${book.weight || ""}\t${
            book.weight_units || ""
          }\t${book.page_count || ""}\t${book.inventory_location || ""}\t${
            book.quantity || ""
          }\t${book.status || ""}\t${book.price || ""}\t${book.cost || ""}\t${
            book.description || ""
          }\t${book.synopsis || ""}\t${book.private_notes || ""}\t${
            book.categories || ""
          }\t${book.catalogs || ""}`,
      )
      .join("\n");

    const blob = new Blob([headers + data], {
      type: "text/tab-separated-values;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = url;
    link.download = "books_list.tab";
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const reversedBooksList = [...booksList].reverse();

  return (
    <VStack
      spacing={4}
      align="stretch"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.400"
      flex="1"
      p={4}
      w="20vw"
      backgroundColor="white"
    >
      <Heading as="h3" size="md">
        Lista de libros {booksList.length > 0 && `(${booksList.length})`}
      </Heading>
      <Button
        onClick={handleExport}
        colorScheme="green"
        isDisabled={booksList.length === 0}
      >
        Exportar como .TAB
      </Button>
      <VStack
        divider={<StackDivider borderColor="gray.400" />}
        spacing={4}
        align="stretch"
        overflowY="scroll"
        flex="1"
      >
        {booksList.length === 0 && (
          <Text color="gray.500">
            Agrega libros a la lista para poder exportar
          </Text>
        )}
        {reversedBooksList.map((book, index) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            p={0}
            variant="alpha"
            key={index}
          >
            <Stack>
              <CardBody p={0}>
                <Heading as="h4" size="sm">
                  {book.title} - {book.author}
                </Heading>

                <Text fontSize="sm" py="2">
                  {book.book_id || "Sin Nº de articulo"}
                </Text>
              </CardBody>

              <CardFooter p={0}>
                <Button
                  onClick={() => onDeleteBook(index)}
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                >
                  Eliminar
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </VStack>
    </VStack>
  );
};

export default ListOfBooks;
