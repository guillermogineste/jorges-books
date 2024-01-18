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
    title: null,
    author: null,
    page_count: "",
    isbn: "",
    publisher: "",
    language: "es",
    publisher_year: "",
    book_id: null,
    listing_type: "Libro",
    illustrator: "",
    keywords: "",
    book_condition: null,
    jacket_condition: "",
    binding_type: null,
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
    price: null,
    cost: "0",
    description: "",
    synopsis: "",
    private_notes: "",
    categories: "",
    catalogs: "",
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const [booksList, setBooksList] = useState([]);
  const [errors, setErrors] = useState({});

  const handleAddBookToList = () => {
    // Validate all fields
    const newErrors = {};
    Object.keys(bookDetails).forEach(key => {
      const value = bookDetails[key];
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });
  
    // Update the errors state
    setErrors(newErrors);
  
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error);
  
    if (!hasErrors) {
      setBooksList([...booksList, bookDetails]);
      // Optionally, reset form state here if needed
    } else {
      // Do not add the book, as there are errors
      // The input fields will show the error messages since the errors state is updated
    }
  };

  const getLanguageCode = (book) => book.volumeInfo.language || "es";
const getPublisherYear = (book) => {
  const publishedDate = book.volumeInfo.publishedDate || "";
  return publishedDate.split("-")[0];
};
const getISBN = (book) => {
  const industryIdentifiers = book.volumeInfo.industryIdentifiers || [];
  const isbn13 = industryIdentifiers.find(identifier => identifier.type === "ISBN_13")?.identifier;
  const isbn10 = industryIdentifiers.find(identifier => identifier.type === "ISBN_10")?.identifier;
  return isbn13 || isbn10 || "";
};

  const handleSelectBook = (book) => {
    setSelectedBook(book);

    setBookDetails({
      title: book.volumeInfo.title || "",
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "",
      page_count: book.volumeInfo.pageCount
        ? book.volumeInfo.pageCount.toString()
        : "",
      isbn: getISBN(book),
      publisher: book.volumeInfo.publisher || "",
      language: getLanguageCode(book),
      publisher_year: getPublisherYear(book),
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

    setErrors({});
  };

  const handleDeleteBook = (book_id) => {
    const newBooksList = booksList.filter((book) => book.book_id !== book_id);
    setBooksList(newBooksList);
  };

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = "Este campo es obligatorio.";
    } else if ((name === "book_condition" || name === "binding_type") && value === "") {
      error = "Por favor, selecciona una opción válida.";
    }
    return error;
  };

  const handleBlur = (key) => {
    const value = bookDetails[key];
    const error = validateField(key, value);
    setErrors({ ...errors, [key]: error });
  };

  const handleDetailChange = (key, value) => {
    setBookDetails({ ...bookDetails, [key]: value === "" ? null : value });
    const error = validateField(key, value);
    setErrors({ ...errors, [key]: error });
  };

  return (
    <ChakraProvider>
      <Center w="100vw" h="100vh" bg="gray.100">
      <Flex
          direction="row"
          align="top"
          justify="center"
          gap={4}
          w="95vw"
          h="95vh"
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
            errors={errors}
            setErrors={setErrors}
            handleBlur={handleBlur}
          />
          <ListOfBooks booksList={booksList} onDeleteBook={handleDeleteBook} />
        </Flex>
      </Center>
    </ChakraProvider>
  );
}
