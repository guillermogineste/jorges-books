import "./styles.css";
import React, { useState } from "react";
import SearchBooks from "./components/SearchBooks";
import spanishLanguages from "./utils/spanish_languages.json";
// TODO
// Crear todos los campos que faltan (custom)
// Guardar libro
// Lista de libros
// Exportar lista a excell

export default function App() {
  const [bookDetails, setBookDetails] = useState({
    // From Books API
    title: "",
    author: "",
    page_count: "",
    isbn: "",
    publisher: "",
    language: "",
    publisher_year: "",
    // Custom properties
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
    status: "",
    price: "",
    cost: "0",
    description: "",
    synopsis: "",
    private_notes: "",
    categories: "",
    catalogs: "",
  });
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    // Language
    const languageCode = book.volumeInfo.language;
    const languageInSpanish = spanishLanguages[languageCode] || "Desconocido";

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
      publisher_year: publisherYear,
    });
  };

  return (
    <div className="App">
      <SearchBooks
        bookDetails={bookDetails}
        setBookDetails={setBookDetails}
        selectedBook={selectedBook}
        handleSelectBook={handleSelectBook}
      />
    </div>
  );
}
