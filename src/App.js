import "./styles.css";
import React, { useState, useEffect } from "react";
import SearchBooks from "./components/SearchBooks";
import ListOfBooks from "./components/ListOfBooks";
import BookDetails from "./components/BookDetails";
import { ChakraProvider, Center, Flex, Box } from "@chakra-ui/react";
// TODO
// Al seleccionar un libro a la derecha, se deberian llenar los detalles a la izquierda

export default function App() {

  const defaultState = {
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
  };

  const [bookDetails, setBookDetails] = useState(defaultState);
  const [selectedBook, setSelectedBook] = useState(null);
  const [booksList, setBooksList] = useState(() => {
    const savedBooksList = localStorage.getItem('booksList');
    return savedBooksList ? JSON.parse(savedBooksList) : [];
  });
  const [errors, setErrors] = useState({});
  const [editingBook, setEditingBook] = useState(false);

  const handleAddBookToList = () => {
    const newErrors = {};
    Object.keys(bookDetails).forEach(key => {
      const value = bookDetails[key];
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== null);

    if (!hasErrors) {
      const existingBookIndex = booksList.findIndex(book => book.book_id === bookDetails.book_id);
      if (existingBookIndex !== -1) {
        // Replace the existing book with the new details
        const newBooksList = [...booksList];
        newBooksList[existingBookIndex] = bookDetails;
        setBooksList(newBooksList);
      } else {
        // Add the new book to the list
        setBooksList([...booksList, bookDetails]);
      }
      // Reset form state here if needed
      setBookDetails(defaultState)
    } else {
      // Do not add the book, as there are errors
      // The input fields will show the error messages since the errors state is updated
    }

  };

  const handleEditBook = (book) => {
    setBookDetails(book);
    setSelectedBook(book);
    setEditingBook(true);
  };

  const handleClearBooksList = () => {
    setBooksList([]);
    localStorage.removeItem('booksList');
  };

  const handleUpdateBook = () => {
    const existingBookIndex = booksList.findIndex(book => book.book_id === bookDetails.book_id);
    if (existingBookIndex !== -1) {
      const newBooksList = [...booksList];
      newBooksList[existingBookIndex] = bookDetails;
      setBooksList(newBooksList);
      setBookDetails(defaultState);
      setEditingBook(false);
    }
  };

  const handleDiscardChanges = () => {
    setBookDetails(defaultState);
    setSelectedBook(null);
    setEditingBook(false);
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

  const mandatoryFields = ['book_id', 'title', 'author', 'book_condition', 'binding_type', 'price'];

  const validateField = (name, value) => {
    // Check if the field is mandatory and validate accordingly
    if (mandatoryFields.includes(name) && !value) {
      return "Este campo es obligatorio.";
    } else if ((name === "book_condition" || name === "binding_type") && value === "") {
      return "Por favor, selecciona una opción válida.";
    } else if (name === "book_id" && booksList.some(book => book.book_id === value)) {
      return "El Nº de artículo ya existe en la lista.";
    }
    // For optional fields or if no error, return null
    return null;
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

  useEffect(() => {
    localStorage.setItem('booksList', JSON.stringify(booksList));
  }, [booksList]);

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
            editingBook={editingBook}
            handleUpdateBook={handleUpdateBook}
            handleDiscardChanges={handleDiscardChanges}
          />
          <ListOfBooks
            booksList={booksList}
            onDeleteBook={handleDeleteBook}
            onEditBook={handleEditBook}
            onClearBooksList={handleClearBooksList}
          />
        </Flex>
      </Center>
    </ChakraProvider>
  );
}
