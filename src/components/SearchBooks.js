import React, { useState } from "react";
import axios from "axios";

const SearchBooks = ({
  bookDetails,
  setBookDetails,
  selectedBook,
  handleSelectBook,
}) => {
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

  const handleDetailChange = (key, value) => {
    setBookDetails({ ...bookDetails, [key]: value });
  };

  return (
    <div className="book_search">
      <form onSubmit={handleSearch} className="searh_form">
        <label htmlFor="bookSearch">Search for books:</label>
        <input
          id="bookSearch"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <label>
          <input
            type="checkbox"
            checked={isISBN}
            onChange={(e) => setIsISBN(e.target.checked)}
          />
          Search by ISBN
        </label>
      </form>
      <div className="book_results">
        <h3>Search results</h3>
        {books.map((book) => (
          <div key={book.id} className="single_book_result">
            {book.volumeInfo.title}
            <button onClick={() => handleSelectBook(book)}>Select</button>
          </div>
        ))}
      </div>

      <div className="form_book_details">
        <h3>Book details</h3>

        <div className="detail_field">
          <label>Title:</label>
          <input
            type="text"
            value={bookDetails.title}
            onChange={(e) => handleDetailChange("title", e.target.value)}
          />
        </div>

        <div className="detail_field">
          <label>Author:</label>
          <input
            type="text"
            value={bookDetails.author}
            onChange={(e) => handleDetailChange("author", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Page Count:</label>
          <input
            type="text"
            value={bookDetails.page_count}
            onChange={(e) => handleDetailChange("page_count", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>ISBN:</label>
          <input
            type="text"
            value={bookDetails.isbn}
            onChange={(e) => handleDetailChange("isbn", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Publisher:</label>
          <input
            type="text"
            value={bookDetails.publisher}
            onChange={(e) => handleDetailChange("publisher", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Language:</label>
          <input
            type="text"
            value={bookDetails.language}
            onChange={(e) =>
              setBookDetails({ ...bookDetails, language: e.target.value })
            }
          />
        </div>
        <div className="detail_field">
          <label>Publisher Year:</label>
          <input
            type="text"
            value={bookDetails.publisher_year}
            onChange={(e) =>
              setBookDetails({ ...bookDetails, publisher_year: e.target.value })
            }
          />
        </div>
        <div className="detail_field">
          <label>Book ID:</label>
          <input
            type="text"
            value={bookDetails.book_id}
            onChange={(e) => handleDetailChange("book_id", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Listing Type:</label>
          <input
            type="text"
            value={bookDetails.listing_type}
            onChange={(e) => handleDetailChange("listing_type", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Illustrator:</label>
          <input
            type="text"
            value={bookDetails.illustrator}
            onChange={(e) => handleDetailChange("illustrator", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Keywords:</label>
          <input
            type="text"
            value={bookDetails.keywords}
            onChange={(e) => handleDetailChange("keywords", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Book Condition:</label>
          <input
            type="text"
            value={bookDetails.book_condition}
            onChange={(e) =>
              handleDetailChange("book_condition", e.target.value)
            }
          />
        </div>
        <div className="detail_field">
          <label>Jacket Condition:</label>
          <input
            type="text"
            value={bookDetails.jacket_condition}
            onChange={(e) =>
              handleDetailChange("jacket_condition", e.target.value)
            }
          />
        </div>
        <div className="detail_field">
          <label>Binding Type:</label>
          <input
            type="text"
            value={bookDetails.binding_type}
            onChange={(e) => handleDetailChange("binding_type", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Signature Type:</label>
          <input
            type="text"
            value={bookDetails.signature_type}
            onChange={(e) =>
              handleDetailChange("signature_type", e.target.value)
            }
          />
        </div>
        <div className="detail_field">
          <label>Edition:</label>
          <input
            type="text"
            value={bookDetails.edition}
            onChange={(e) => handleDetailChange("edition", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Printing:</label>
          <input
            type="text"
            value={bookDetails.printing}
            onChange={(e) => handleDetailChange("printing", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Volume:</label>
          <input
            type="text"
            value={bookDetails.volume}
            onChange={(e) => handleDetailChange("volume", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Publisher Place:</label>
          <input
            type="text"
            value={bookDetails.publisher_place}
            onChange={(e) =>
              handleDetailChange("publisher_place", e.target.value)
            }
          />
        </div>
        <div className="detail_field">
          <label>Size:</label>
          <input
            type="text"
            value={bookDetails.size}
            onChange={(e) => handleDetailChange("size", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Weight:</label>
          <input
            type="text"
            value={bookDetails.weight}
            onChange={(e) => handleDetailChange("weight", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Weight Units:</label>
          <input
            type="text"
            value={bookDetails.weight_units}
            onChange={(e) => handleDetailChange("weight_units", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Inventory Location:</label>
          <input
            type="text"
            value={bookDetails.inventory_location}
            onChange={(e) =>
              handleDetailChange("inventory_location", e.target.value)
            }
          />
        </div>
        <div className="detail_field">
          <label>Quantity:</label>
          <input
            type="text"
            value={bookDetails.quantity}
            onChange={(e) => handleDetailChange("quantity", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Status:</label>
          <input
            type="text"
            value={bookDetails.status}
            onChange={(e) => handleDetailChange("status", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Price:</label>
          <input
            type="text"
            value={bookDetails.price}
            onChange={(e) => handleDetailChange("price", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Cost:</label>
          <input
            type="text"
            value={bookDetails.cost}
            onChange={(e) => handleDetailChange("cost", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Description:</label>
          <textarea
            value={bookDetails.description}
            onChange={(e) => handleDetailChange("description", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Synopsis:</label>
          <textarea
            value={bookDetails.synopsis}
            onChange={(e) => handleDetailChange("synopsis", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Private Notes:</label>
          <textarea
            value={bookDetails.private_notes}
            onChange={(e) =>
              handleDetailChange("private_notes", e.target.value)
            }
          />
        </div>
        <div className="detail_field">
          <label>Categories:</label>
          <input
            type="text"
            value={bookDetails.categories}
            onChange={(e) => handleDetailChange("categories", e.target.value)}
          />
        </div>
        <div className="detail_field">
          <label>Catalogs:</label>
          <input
            type="text"
            value={bookDetails.catalogs}
            onChange={(e) => handleDetailChange("catalogs", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBooks;
