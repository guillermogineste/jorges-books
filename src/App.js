import "./styles.css";
import React, { useState } from "react";
import SearchBooks from "./components/SearchBooks";
import ListOfBooks from "./components/ListOfBooks";
import spanishLanguages from "./utils/spanish_languages.json";
import { ChakraProvider } from "@chakra-ui/react";
// TODO
// Al seleccionar un libro a la derecha, se deberian llenar los detalles a la izquierda
// Arreglar problema con el idioma

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
    const languageCode = book.volumeInfo.language;
    let languageInSpanish = "es";
    if (languageCode && spanishLanguages.hasOwnProperty(languageCode)) {
      languageInSpanish = spanishLanguages[languageCode];
    }

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
      language: languageInSpanish,
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

  return (
    // <ChakraProvider>
    <div className="App">
      <SearchBooks
        bookDetails={bookDetails}
        setBookDetails={setBookDetails}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        handleSelectBook={handleSelectBook}
        handleAddBookToList={handleAddBookToList}
      />
      <ListOfBooks booksList={booksList} onDeleteBook={handleDeleteBook} />
    </div>
    // </ChakraProvider>
  );
}
