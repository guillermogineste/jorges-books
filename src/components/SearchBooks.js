import React, { useState } from "react";
import axios from "axios";

const SearchBooks = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${
          BOOKS - API
        }`,
      );
      setBooks(result.data.items.slice(0, 3)); // Get the first 3 matches
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {books.map((book) => (
          <div key={book.id}>{book.volumeInfo.title}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
