import React, { useState } from "react";
import axios from "axios";
import spanishLanguages from "../utils/spanish_languages.json";

const SearchBooks = ({
  bookDetails,
  setBookDetails,
  selectedBook,
  setSelectedBook,
  handleSelectBook,
  handleAddBookToList,
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
      <div className="search_and_results">
        <form onSubmit={handleSearch} className="searh_form">
          <h3>Buscar un libro</h3>

          <label htmlFor="bookSearch">Buscar un libro:</label>
          <div className="search_field">
            <input
              id="bookSearch"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button type="submit">Buscar</button>
          </div>
          <label>
            <input
              type="checkbox"
              checked={isISBN}
              onChange={(e) => setIsISBN(e.target.checked)}
            />
            Usar ISBN para buscar
          </label>
        </form>
        <div className="book_results">
          <h3>Resultados</h3>
          {books.map((book) => (
            <div key={book.id} className="single_book_result">
              <div className="book_thumbnail_info">
                <img
                  src={book.volumeInfo.imageLinks?.smallThumbnail}
                  alt={`Cover of ${book.volumeInfo.title}`}
                  className="book_thumbnail"
                />
                <div className="book_info">
                  <h4>{book.volumeInfo.title}</h4>
                  <p>
                    {book.volumeInfo.authors?.join(", ")}
                    {book.volumeInfo.publisher
                      ? ` (${book.volumeInfo.publisher}`
                      : ""}
                    {book.volumeInfo.publishedDate &&
                      `, ${book.volumeInfo.publishedDate.substring(0, 4)})`}
                    {!book.volumeInfo.publisher &&
                      book.volumeInfo.publishedDate &&
                      `, ${book.volumeInfo.publishedDate.substring(0, 4)})`}
                  </p>
                </div>
              </div>
              <button onClick={() => handleSelectBook(book)}>
                Seleccionar
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="details_panel">
        <div className="form_book_details">
          <h2>Detalles del libro</h2>
          <p>Completa los detalles necesarios</p>
          <section className="form_section">
            <h3>General</h3>
            <div className="detail_field">
              <label>Nº de artículo:</label>
              <input
                type="text"
                value={bookDetails.book_id}
                onChange={(e) => handleDetailChange("book_id", e.target.value)}
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
              <label>Tipo de artículo:</label>
              <input
                type="text"
                value={bookDetails.listing_type}
                onChange={(e) =>
                  handleDetailChange("listing_type", e.target.value)
                }
              />
            </div>
            <div className="detail_field">
              <label>Titulo:</label>
              <input
                type="text"
                value={bookDetails.title}
                onChange={(e) => handleDetailChange("title", e.target.value)}
              />
            </div>
            <div className="detail_field">
              <label>Autor:</label>
              <input
                type="text"
                value={bookDetails.author}
                onChange={(e) => handleDetailChange("author", e.target.value)}
              />
            </div>
            <div className="detail_field">
              <label>Ilustrador:</label>
              <input
                type="text"
                value={bookDetails.illustrator}
                onChange={(e) =>
                  handleDetailChange("illustrator", e.target.value)
                }
              />
            </div>
          </section>

          <section className="form_section">
            <h3>Atributos:</h3>
            <div className="detail_field">
              <label>Estado:</label>
              <select
                value={bookDetails.book_condition}
                onChange={(e) =>
                  handleDetailChange("book_condition", e.target.value)
                }
              >
                <option value="">no especificado</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Como Nuevo">Como Nuevo</option>
                <option value="Aceptable">Aceptable</option>
                <option value="Casi Bien">Casi Bien</option>
                <option value="Muy Bien">Muy Bien</option>
                <option value="Bien">Bien</option>
                <option value="Regular">Regular</option>
                <option value="Pobre">Pobre</option>
              </select>
            </div>
            <div className="detail_field">
              <label>Sobrecubierta:</label>
              <select
                value={bookDetails.jacket_condition}
                onChange={(e) =>
                  handleDetailChange("jacket_condition", e.target.value)
                }
              >
                <option value="">No especificado</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Como Nuevo">Como Nuevo</option>
                <option value="Aceptable">Aceptable</option>
                <option value="Casi Bien">Casi Bien</option>
                <option value="Muy Bien">Muy Bien</option>
                <option value="Bien">Bien</option>
                <option value="Regular">Regular</option>
                <option value="Pobre">Pobre</option>
                <option value="Sin Sobrecubierta">Sin Sobrecubierta</option>
                <option value="Sobrecubierta no Incluida">
                  Sobrecubierta no Incluida
                </option>
              </select>
            </div>
            <div className="detail_field">
              <label>Encuadernación:</label>
              <select
                value={bookDetails.binding_type}
                onChange={(e) =>
                  handleDetailChange("binding_type", e.target.value)
                }
              >
                <option value="">No especificado</option>
                <option value="Encuadernación de tapa dura">
                  Encuadernación de tapa dura
                </option>
                <option value="Encuadernación de tapa blanda">
                  Encuadernación de tapa blanda
                </option>
                <option value="Libro en Audio (Cassette)">
                  Libro en Audio (Cassette)
                </option>
                <option value="Libro en Audio (CD)">Libro en Audio (CD)</option>
                <option value="Libro en Audio (DVD)">
                  Libro en Audio (DVD)
                </option>
                <option value="Sin Encuadernar">Sin Encuadernar</option>
              </select>
            </div>
            <div className="detail_field">
              <label>Idioma:</label>
              <select
                value={bookDetails.language}
                onChange={(e) =>
                  setBookDetails({ ...bookDetails, language: e.target.value })
                }
              >
                {Object.entries(spanishLanguages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="detail_field">
              <label htmlFor="signature_type">Firma:</label>
              <select
                id="signature_type"
                value={bookDetails.signature_type}
                onChange={(e) =>
                  handleDetailChange("signature_type", e.target.value)
                }
              >
                <option value="">no especificado</option>
                <option value="Firmado por el Autor(es)">
                  Firmado por el Autor(es)
                </option>
                <option value="Dedicado por el Autor(es)">
                  Dedicado por el Autor(es)
                </option>
                <option value="Firmado por el Ilustrador(es)">
                  Firmado por el Ilustrador(es)
                </option>
                <option value="Dedicado por el Ilustrador(es)">
                  Dedicado por el Ilustrador(es)
                </option>
              </select>
            </div>

            <div className="detail_field">
              <label htmlFor="edition">Edición:</label>
              <select
                id="edition"
                value={bookDetails.edition}
                onChange={(e) => handleDetailChange("edition", e.target.value)}
              >
                <option value="">no especificado</option>
                <option value="1ª Edición">1ª Edición</option>
                <option value="2ª Edición">2ª Edición</option>
                <option value="3ª Edición">3ª Edición</option>
                <option value="4ª Edición">4ª Edición</option>
                <option value="5ª Edición o Posterior">
                  5ª Edición o Posterior
                </option>
                <option value="Edición del club de Libro">
                  Edición del club de Libro
                </option>
                <option value="Edición Especial">Edición Especial</option>
                <option value="Edición Limitada">Edición Limitada</option>
                <option value="Edición Ilustrada">Edición Ilustrada</option>
              </select>
            </div>
            <div className="detail_field">
              <label htmlFor="printing">Tirada:</label>
              <select
                id="printing"
                value={bookDetails.printing}
                onChange={(e) => handleDetailChange("printing", e.target.value)}
              >
                <option value="">no especificado</option>
                <option value="1ª Impresión">1ª Impresión</option>
                <option value="2ª Impresión">2ª Impresión</option>
                <option value="3ª Impresión">3ª Impresión</option>
                <option value="4ª Impresión">4ª Impresión</option>
                <option value="5ª Impresión o Posterior">
                  5ª Impresión o Posterior
                </option>
                <option value="Impresión desconocida">
                  Impresión desconocida
                </option>
              </select>
            </div>
            <div className="detail_field">
              <label>Volumen:</label>
              <input
                type="text"
                value={bookDetails.volume}
                onChange={(e) => handleDetailChange("volume", e.target.value)}
              />
            </div>
          </section>

          <section className="form_section">
            <h3>Editorial:</h3>
            <div className="detail_field">
              <label>Editorial:</label>
              <input
                type="text"
                value={bookDetails.publisher}
                onChange={(e) =>
                  handleDetailChange("publisher", e.target.value)
                }
              />
            </div>
            <div className="detail_field">
              <label>Año:</label>
              <input
                type="text"
                value={bookDetails.publisher_year}
                onChange={(e) =>
                  setBookDetails({
                    ...bookDetails,
                    publisher_year: e.target.value,
                  })
                }
              />
            </div>
            <div className="detail_field">
              <label>Lugar:</label>
              <input
                type="text"
                value={bookDetails.publisher_place}
                onChange={(e) =>
                  handleDetailChange("publisher_place", e.target.value)
                }
              />
            </div>
          </section>

          <section className="form_section">
            <h3>Información:</h3>
            <div className="detail_field">
              <label>Descripción:</label>
              <textarea
                value={bookDetails.description}
                onChange={(e) =>
                  handleDetailChange("description", e.target.value)
                }
              />
            </div>
            <div className="detail_field">
              <label>Palabras clave:</label>
              <input
                type="text"
                value={bookDetails.keywords}
                onChange={(e) => handleDetailChange("keywords", e.target.value)}
              />
            </div>
            <div className="detail_field">
              <label>Notas Privadas:</label>
              <textarea
                value={bookDetails.private_notes}
                onChange={(e) =>
                  handleDetailChange("private_notes", e.target.value)
                }
              />
            </div>
          </section>

          <section className="form_section">
            <h3>Atributos Físicos:</h3>

            <div className="detail_field">
              <label>Tamaño:</label>
              <input
                type="text"
                value={bookDetails.size}
                onChange={(e) => handleDetailChange("size", e.target.value)}
              />
            </div>
            <div className="detail_field">
              <label>Peso:</label>
              <input
                type="text"
                value={bookDetails.weight}
                onChange={(e) => handleDetailChange("weight", e.target.value)}
              />
              <div className="detail_field">
                <label>Unidades de peso:</label>
                <input
                  type="text"
                  value={bookDetails.weight_units}
                  onChange={(e) =>
                    handleDetailChange("weight_units", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="detail_field">
              <label>Páginas:</label>
              <input
                type="text"
                value={bookDetails.page_count}
                onChange={(e) =>
                  handleDetailChange("page_count", e.target.value)
                }
              />
            </div>
          </section>

          <section className="form_section">
            <h3>Inventario:</h3>
            <div className="detail_field">
              <label>Cantidad:</label>
              <input
                type="text"
                value={bookDetails.quantity}
                onChange={(e) => handleDetailChange("quantity", e.target.value)}
              />
            </div>
            <div className="detail_field">
              <label>Estado:</label>
              <input
                type="text"
                value={bookDetails.status}
                onChange={(e) => handleDetailChange("status", e.target.value)}
              />
            </div>
            <div className="detail_field">
              <label>Coste:</label>
              <input
                type="text"
                value={bookDetails.cost}
                onChange={(e) => handleDetailChange("cost", e.target.value)}
              />
            </div>
            <div className="detail_field">
              <label>Situación:</label>
              <input
                type="text"
                value={bookDetails.inventory_location}
                onChange={(e) =>
                  handleDetailChange("inventory_location", e.target.value)
                }
              />
            </div>

            <div className="detail_field">
              <label>Precio:</label>
              <input
                type="text"
                value={bookDetails.price}
                onChange={(e) => handleDetailChange("price", e.target.value)}
              />
            </div>
          </section>

          <section className="form_section">
            <h3>Resumen:</h3>
            <div className="detail_field">
              <label>Resumen:</label>
              <textarea
                value={bookDetails.synopsis}
                onChange={(e) => handleDetailChange("synopsis", e.target.value)}
              />
            </div>
          </section>
          <section className="form_section">
            <h3>Categorías:</h3>
            <div className="detail_field">
              <label>Categorías:</label>
              <input
                type="text"
                value={bookDetails.categories}
                onChange={(e) =>
                  handleDetailChange("categories", e.target.value)
                }
              />
            </div>
          </section>
          <section className="form_section">
            <h3>Catálogos:</h3>
            <div className="detail_field">
              <label>Catálogos:</label>
              <input
                type="text"
                value={bookDetails.catalogs}
                onChange={(e) => handleDetailChange("catalogs", e.target.value)}
              />
            </div>
          </section>
        </div>
        <div className="details_footer">
          <button onClick={() => handleAddBookToList(bookDetails)}>
            Añadir libro a la lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBooks;
