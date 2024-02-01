import React, { useState } from "react";
import { VStack } from "@chakra-ui/react";
import CompactListContent from './CompactListContent';
import ExpandedListContent from './ExpandedListContent';



const ListOfBooks = ({ booksList, onDeleteBook, onEditBook, onClearBooksList }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => setIsExpanded(!isExpanded)
  
  const handleExport = () => {
    const headers =
      "Book ID\tISBN\tListing Type\tTitle\tAuthor\tIllustrator\tKeywords\tBook Condition\tJacket Condition\tBinding Type\tLanguage\tSignature Type\tEdition\tPrinting\tVolume\tPublisher\tPublisher Year\tPublisher Place\tSize\tWeight\tWeight Units\tPage Count\tInventory Location\tQuantity\tStatus\tPrice\tCost\tDescription\tSynopsis\tPrivate Notes\tCategories\tCatalogs\n";

    const data = booksList
      .map(
        (book) =>
          `${book.book_id || ""}\t${book.isbn || ""}\t${book.listing_type || ""
          }\t${book.title || ""}\t${book.author || ""}\t${book.illustrator || ""
          }\t${book.keywords || ""}\t${book.book_condition || ""}\t${book.jacket_condition || ""
          }\t${book.binding_type || ""}\t${book.language || ""}\t${book.signature_type || ""
          }\t${book.edition || ""}\t${book.printing || ""}\t${book.volume || ""
          }\t${book.publisher || ""}\t${book.publisher_year || ""}\t${book.publisher_place || ""
          }\t${book.size || ""}\t${book.weight || ""}\t${book.weight_units || ""
          }\t${book.page_count || ""}\t${book.inventory_location || ""}\t${book.quantity || ""
          }\t${book.status || ""}\t${book.price || ""}\t${book.cost || ""}\t${book.description || ""
          }\t${book.synopsis || ""}\t${book.private_notes || ""}\t${book.categories || ""
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
    <VStack 
            
            borderWidth="1px"
            borderRadius="lg"
            borderColor="gray.400"
            p={4}
            backgroundColor="white"
            maxW={"340px"}
            >
              
      {isExpanded ? (
        <ExpandedListContent
          onToggleExpand={handleToggleExpand}
          booksList={booksList}
          onDeleteBook={onDeleteBook}
          onEditBook={onEditBook}
          onClearBooksList={onClearBooksList}
          handleExport={handleExport}
          booksCount={booksList.length}
        />
      ) : (
        <CompactListContent
          booksList={booksList}
          onToggleExpand={handleToggleExpand}
          booksCount={booksList.length}
          handleExport={handleExport}
        />
      )}
    </VStack >
  );
};

export default ListOfBooks;
