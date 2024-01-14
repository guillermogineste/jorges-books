import React from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  StackDivider,
  Card,
  Stack,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

const SearchResults = ({ books, handleSelectBook }) => {
  return (
    <Flex
      overflow="hidden"
      gap="4"
      borderColor="gray.400"
      flexGrow={1}
      flexDirection="column"
      flex="1"
    >
      <Heading as="h4" size="sm" color="gray.500">
        Resultados
      </Heading>
      <VStack spacing={2} align="stretch">
        {books.length > 0 ? (
          books.map((book) => (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              p={4}
              variant="outline"
              borderColor="gray.400"
            >
              <Image
                width="80px"
                objectFit="contain"
                align="top"
                src={book.volumeInfo.imageLinks?.smallThumbnail}
                alt={`Cover of ${book.volumeInfo.title}`}
                fallbackSrc="https://placehold.co/80x80?text=No+Image"
              />
              <Stack>
                <CardBody py="0">
                  <Heading as="h4" size="sm">
                    {book.volumeInfo.title}
                  </Heading>

                  <Text fontSize="sm" py="2">
                    {book.volumeInfo.authors?.join(", ")}
                    {book.volumeInfo.publisher
                      ? ` (${book.volumeInfo.publisher}`
                      : ""}
                    {book.volumeInfo.publishedDate &&
                      `, ${book.volumeInfo.publishedDate.substring(0, 4)})`}
                    {!book.volumeInfo.publisher &&
                      book.volumeInfo.publishedDate &&
                      `, ${book.volumeInfo.publishedDate.substring(0, 4)})`}
                  </Text>
                </CardBody>

                <CardFooter py="0">
                  <Button
                    onClick={() => handleSelectBook(book)}
                    colorScheme="blue"
                    size="sm"
                    variant="outline"
                  >
                    Seleccionar
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          ))
        ) : (
          <Box>
            <Text color="gray.500">
              Realiza una búsqueda para ver resultados
            </Text>
          </Box>
        )}
      </VStack>
    </Flex>
  );
};

export default SearchResults;

{
  /* <Box key={book.id} overflow="hidden" p={4} gap="2">
              <Flex gap="2">
                <Image
                  boxSize="80px"
                  objectFit="cover"
                  src={book.volumeInfo.imageLinks?.smallThumbnail}
                  alt={`Cover of ${book.volumeInfo.title}`}
                  fallbackSrc="https://placehold.co/80x80?text=No+Image"
                />
                <Box gap="2">
                  <Heading as="h4" size="sm">
                    {book.volumeInfo.title}
                  </Heading>
                  <Text fontSize="sm">
                    {book.volumeInfo.authors?.join(", ")}
                    {book.volumeInfo.publisher
                      ? ` (${book.volumeInfo.publisher}`
                      : ""}
                    {book.volumeInfo.publishedDate &&
                      `, ${book.volumeInfo.publishedDate.substring(0, 4)})`}
                    {!book.volumeInfo.publisher &&
                      book.volumeInfo.publishedDate &&
                      `, ${book.volumeInfo.publishedDate.substring(0, 4)})`}
                  </Text>
                </Box>
              </Flex>
              <Button onClick={() => handleSelectBook(book)} colorScheme="blue">
                Seleccionar
              </Button>
            </Box> */
}
