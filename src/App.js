import "./styles.css";
import React, { useState } from "react";
import SearchBooks from "./components/SearchBooks";
import ListOfBooks from "./components/ListOfBooks";
import BookDetails from "./components/BookDetails";
import { ChakraProvider, Center, Flex, Box } from "@chakra-ui/react";
// TODO
// Al seleccionar un libro a la derecha, se deberian llenar los detalles a la izquierda

export default function App() {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    page_count: "",
    isbn: "",
    publisher: "",
    language: "es",
    publisher_year: "",
    book_id: "",
    listing_type: "Libro",
    illustrator: "",
    keywords: "",
    book_condition: "",
    jacket_condition: "",
    binding_type: "",
    signature_type: "",
    edition: "",
    printing: "",
    volume: "",
    publisher_place: "",
    size: "",
    weight: "0",
    weight_units: "",
    inventory_location: "",
    quantity: "1",
    status: "En venta",
    price: "",
    cost: "0",
    description: "",
    synopsis: "",
    private_notes: "",
    categories: "",
    catalogs: "",
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const [booksList, setBooksList] = useState([]);

  const handleAddBookToList = (newBook) => {
    setBooksList([...booksList, newBook]);
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    // Language
    const languageCode = book.volumeInfo.language || "es";
    // Publishing Year
    const publishedDate = book.volumeInfo.publishedDate || "";
    const publisherYear = publishedDate.split("-")[0];
    // ISBN
    const industryIdentifiers = book.volumeInfo.industryIdentifiers || [];
    const isbn13 = industryIdentifiers.find(
      (identifier) => identifier.type === "ISBN_13",
    )?.identifier;
    const isbn10 = industryIdentifiers.find(
      (identifier) => identifier.type === "ISBN_10",
    )?.identifier;
    const isbn = isbn13 || isbn10 || "";

    setBookDetails({
      title: book.volumeInfo.title || "",
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "",
      page_count: book.volumeInfo.pageCount
        ? book.volumeInfo.pageCount.toString()
        : "",
      isbn: isbn,
      publisher: book.volumeInfo.publisher || "",
      language: languageCode,
      publisher_year: publisherYear || "",
      book_id: "",
      listing_type: "Libro",
      illustrator: "",
      keywords: "",
      book_condition: "",
      jacket_condition: "",
      binding_type: "",
      signature_type: "",
      edition: "",
      printing: "",
      volume: "",
      publisher_place: "",
      size: "",
      weight: "0",
      weight_units: "",
      inventory_location: "",
      quantity: "1",
      status: "En venta",
      price: "",
      cost: "0",
      description: "",
      synopsis: "",
      private_notes: "",
      categories: "",
      catalogs: "",
    });
  };

  const handleDeleteBook = (index) => {
    const newBooksList = booksList.filter((_, i) => i !== index);
    setBooksList(newBooksList);
  };

  const handleDetailChange = (key, value) => {
    setBookDetails({ ...bookDetails, [key]: value });
  };

  return (
    <ChakraProvider>
      <Center w="100vw" h="100vh" bg="gray.100">
        <Flex
          direction="row"
          align="top"
          justify="center"
          gap={4}
          w="90vw"
          h="80vh"
        >
          <SearchBooks
            bookDetails={bookDetails}
            setBookDetails={setBookDetails}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
            handleSelectBook={handleSelectBook}
            handleAddBookToList={handleAddBookToList}
          />
          <BookDetails
            bookDetails={bookDetails}
            handleDetailChange={handleDetailChange}
            handleAddBookToList={handleAddBookToList}
            selectedBook={selectedBook}
          />
          <ListOfBooks booksList={booksList} onDeleteBook={handleDeleteBook} />
        </Flex>
      </Center>
    </ChakraProvider>
  );
}
