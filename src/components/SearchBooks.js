import React, { useState } from "react";
import axios from "axios";

const SearchBooks = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${BOOKS_API}`,
      );
      setBooks(result.data.items.slice(0, 3));
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
      <p>key = {process.env.BOOKS_API}</p>
      <div>
        {books.map((book) => (
          <div key={book.id}>{book.volumeInfo.title}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
