import React, { useState } from "react";
import {
  Button,
  Heading,
  VStack,
  StackDivider,
  Text,
  IconButton,
  Tooltip,
  HStack,
  Box
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const ListOfBooks = ({ booksList, onDeleteBook, onEditBook }) => {
  const handleExport = () => {
    const headers =
      "Book ID\tISBN\tListing Type\tTitle\tAuthor\tIllustrator\tKeywords\tBook Condition\tJacket Condition\tBinding Type\tLanguage\tSignature Type\tEdition\tPrinting\tVolume\tPublisher\tPublisher Year\tPublisher Place\tSize\tWeight\tWeight Units\tPage Count\tInventory Location\tQuantity\tStatus\tPrice\tCost\tDescription\tSynopsis\tPrivate Notes\tCategories\tCatalogs\n";

    const data = booksList
      .map(
        (book) =>
          `${book.book_id || ""}\t${book.isbn || ""}\t${book.listing_type || ""
          }\t${book.title || ""}\t${book.author || ""}\t${book.illustrator || ""
          }\t${book.keywords || ""}\t${book.book_condition || ""}\t${book.jacket_condition || ""
          }\t${book.binding_type || ""}\t${book.language || ""}\t${book.signature_type || ""
          }\t${book.edition || ""}\t${book.printing || ""}\t${book.volume || ""
          }\t${book.publisher || ""}\t${book.publisher_year || ""}\t${book.publisher_place || ""
          }\t${book.size || ""}\t${book.weight || ""}\t${book.weight_units || ""
          }\t${book.page_count || ""}\t${book.inventory_location || ""}\t${book.quantity || ""
          }\t${book.status || ""}\t${book.price || ""}\t${book.cost || ""}\t${book.description || ""
          }\t${book.synopsis || ""}\t${book.private_notes || ""}\t${book.categories || ""
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
        overflowY="auto"
        flex="1"
      >
        {booksList.length === 0 && (
          <Text color="gray.500">
            Agrega libros a la lista para poder exportar
          </Text>
        )}
        {reversedBooksList.map((book, index) => (
          <Box
            direction={{ base: "column", sm: "row" }}
            p={0}
            variant="alpha"
            key={index}
            width="100%"
          >
            <HStack>
              <VStack p={0} flex="1" alignItems="flex-start">
                <Heading as="h4" size="sm">
                  {book.title} - {book.author}
                </Heading>
                <Text fontSize="sm">
                  {book.book_id || "Sin Nº de articulo"}
                </Text>
              </VStack>

              <HStack gap={2}>
                <Tooltip hasArrow label='Editar' placement='top'>
                  <IconButton
                    size="sm"
                    variant='outline'
                    colorScheme='blue'
                    aria-label='Editar'
                    icon={<EditIcon />}
                    onClick={() => onEditBook(book)}
                  />
                </Tooltip>
                <Tooltip hasArrow label='Borrar' placement='top'>
                  <IconButton
                    size="sm"
                    variant='outline'
                    colorScheme="red"
                    aria-label='Borrar'
                    icon={<DeleteIcon />}
                    onClick={() => onDeleteBook(book.book_id)}
                  />
                </Tooltip>
              </HStack>

            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default ListOfBooks;
