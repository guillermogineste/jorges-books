import React, { useState } from "react";
import axios from "axios";
import spanishLanguages from "../utils/spanish_languages.json";
import BookDetailsForm from "./BookDetailsForm";
import SearchResults from "./SearchResults";
import DetailsFooter from "./DetailsFooter";
import SearchInput from "./SearchInput";
import { VStack, HStack, StackDivider, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBooks = ({ setSelectedBook, handleSelectBook }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isISBN, setIsISBN] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchQuery = isISBN ? `isbn:${query}` : query;
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`,
      );
      setBooks(result.data.items.slice(0, 3));
      setSelectedBook(null);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <VStack spacing={4} align="stretch" flex="1">
      <SearchInput
        query={query}
        setQuery={setQuery}
        isISBN={isISBN}
        setIsISBN={setIsISBN}
        handleSearch={handleSearch}
      />
      <SearchResults books={books} handleSelectBook={handleSelectBook} />
    </VStack>
  );
};

export default SearchBooks;
