import React, { useState } from "react";

const ListOfBooks = ({ booksList, onDeleteBook }) => {
  const handleExport = () => {
    const headers =
      "Book ID\tISBN\tListing Type\tTitle\tAuthor\tIllustrator\tKeywords\tBook Condition\tJacket Condition\tBinding Type\tLanguage\tSignature Type\tEdition\tPrinting\tVolume\tPublisher\tPublisher Year\tPublisher Place\tSize\tWeight\tWeight Units\tPage Count\tInventory Location\tQuantity\tStatus\tPrice\tCost\tDescription\tSynopsis\tPrivate Notes\tCategories\tCatalogs\n";

    const data = booksList
      .map(
        (book) =>
          `${book.book_id || ""}\t${book.isbn || ""}\t${
            book.listing_type || ""
          }\t${book.title || ""}\t${book.author || ""}\t${
            book.illustrator || ""
          }\t${book.keywords || ""}\t${book.book_condition || ""}\t${
            book.jacket_condition || ""
          }\t${book.binding_type || ""}\t${book.language || ""}\t${
            book.signature_type || ""
          }\t${book.edition || ""}\t${book.printing || ""}\t${
            book.volume || ""
          }\t${book.publisher || ""}\t${book.publisher_year || ""}\t${
            book.publisher_place || ""
          }\t${book.size || ""}\t${book.weight || ""}\t${
            book.weight_units || ""
          }\t${book.page_count || ""}\t${book.inventory_location || ""}\t${
            book.quantity || ""
          }\t${book.status || ""}\t${book.price || ""}\t${book.cost || ""}\t${
            book.description || ""
          }\t${book.synopsis || ""}\t${book.private_notes || ""}\t${
            book.categories || ""
          }\t${book.catalogs || ""}`,
      )
      .join("\n");

    const blob = new Blob([headers + data], {
      type: "text/tab-separated-values;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = url;
    link.download = "books_list.tab";
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="list_of_books">
      <h3>Lista de libros</h3>
      <button onClick={handleExport}>Exportar como .TAB</button>
      <ul>
        {booksList.map((book, index) => (
          <li key={index}>
            {book.book_id || "Sin Nº de articulo"} - {book.title} -{" "}
            {book.author}
            <button onClick={() => onDeleteBook(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfBooks;
