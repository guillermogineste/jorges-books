import React, { useState, useEffect } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import spanishLanguages from "../utils/spanish_languages.json";

const BookDetailsForm = ({ bookDetails, handleDetailChange, selectedBook }) => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (selectedBook) {
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 400);
      return () => clearTimeout(timer);
    }
  }, [selectedBook]);

  const formBgColor = useColorModeValue(
    isFlashing ? "blue.50" : "white",
    isFlashing ? "blue.700" : "gray.700",
  );

  return (
    <VStack
      spacing={2}
      align="stretch"
      p={4}
      borderRadius="md"
      bg={formBgColor}
      m="1px"
    >
      <Heading as="h3" size="md">
        Detalles del libro
      </Heading>
      <VStack spacing={4} align="stretch">
        <VStack spacing={3} align="stretch">
          <Heading as="h4" size="sm">
            General
          </Heading>
          <FormControl>
            <FormLabel fontSize="sm">Nº de artículo</FormLabel>
            <Input
              id="book-id"
              size="sm"
              type="text"
              value={bookDetails.book_id}
              onChange={(e) => handleDetailChange("book_id", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">ISBN</FormLabel>
            <Input
              id="isbn"
              size="sm"
              type="text"
              value={bookDetails.isbn}
              onChange={(e) => handleDetailChange("isbn", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Tipo de artículo</FormLabel>
            <Input
              id="listing-type"
              size="sm"
              type="text"
              value={bookDetails.listing_type}
              onChange={(e) => handleDetailChange("listing_type", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Titulo</FormLabel>
            <Input
              id="title"
              size="sm"
              type="text"
              value={bookDetails.title}
              onChange={(e) => handleDetailChange("title", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Autor</FormLabel>
            <Input
              id="author"
              size="sm"
              type="text"
              value={bookDetails.author}
              onChange={(e) => handleDetailChange("author", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Ilustrador</FormLabel>
            <Input
              id="illustrator"
              size="sm"
              type="text"
              value={bookDetails.illustrator}
              onChange={(e) => handleDetailChange("illustrator", e.target.value)}
            />
          </FormControl>
        </VStack>

        <VStack spacing={3} align="stretch">
          <Heading as="h4" size="sm">
            Atributos
          </Heading>
          <HStack gap={2}>
            <FormControl>
              <FormLabel fontSize="sm">Estado</FormLabel>
              <Select
                id="book-condition"
                size="sm"
                value={bookDetails.book_condition}
                onChange={(e) =>
                  handleDetailChange("book_condition", e.target.value)
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
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Firma</FormLabel>
              <Select
                size="sm"
                id="signature_type"
                value={bookDetails.signature_type}
                onChange={(e) =>
                  handleDetailChange("signature_type", e.target.value)
                }
              >
                <option value="">No especificado</option>
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
              </Select>
            </FormControl>
          </HStack>
          <HStack gap={2}>
            <FormControl>
              <FormLabel fontSize="sm">Sobrecubierta</FormLabel>
              <Select
                id="jacket-condition"
                size="sm"
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
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Edición</FormLabel>
              <Select
                id="edition"
                size="sm"
                value={bookDetails.edition}
                onChange={(e) => handleDetailChange("edition", e.target.value)}
              >
                <option value="">No especificado</option>
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
              </Select>
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel fontSize="sm">Encuadernación</FormLabel>
            <Select
              id="binding-type"
              size="sm"
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
              <option value="Libro en Audio (DVD)">Libro en Audio (DVD)</option>
              <option value="Sin Encuadernar">Sin Encuadernar</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Idioma</FormLabel>
            <Select
              id="language"
              size="sm"
              value={bookDetails.language}
              onChange={(e) => handleDetailChange("language", e.target.value)}
            >
              {Object.entries(spanishLanguages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
        </VStack>

        <VStack spacing={3} align="stretch">
          <Heading as="h4" size="sm">
            Editorial
          </Heading>
          <FormControl>
            <FormLabel fontSize="sm">Editorial</FormLabel>
            <Input
              id="publisher"
              size="sm"
              type="text"
              value={bookDetails.publisher}
              onChange={(e) => handleDetailChange("publisher", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Año</FormLabel>
            <Input
              id="publisher-year"
              size="sm"
              type="text"
              value={bookDetails.publisher_year}
              onChange={(e) => handleDetailChange("publisher_year", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Lugar</FormLabel>
            <Input
              id="publisher-place"
              size="sm"
              type="text"
              value={bookDetails.publisher_place}
              onChange={(e) => handleDetailChange("publisher_place", e.target.value)}
            />
          </FormControl>
        </VStack>

        <VStack spacing={3} align="stretch">
          <Heading as="h4" size="sm">
            Información
          </Heading>
          <FormControl>
            <FormLabel fontSize="sm">Descripción</FormLabel>
            <Textarea
              id="description"
              value={bookDetails.description}
              onChange={(e) => handleDetailChange("description", e.target.value)}
            />
          </FormControl>
        </VStack>

        <VStack spacing={3} align="stretch">
          <Heading as="h4" size="sm">
            Atributos Físicos
          </Heading>
          <FormControl>
            <FormLabel fontSize="sm">Páginas</FormLabel>
            <Input
              id="page-count"
              size="sm"
              type="text"
              value={bookDetails.page_count}
              onChange={(e) => handleDetailChange("page_count", e.target.value)}
            />
          </FormControl>
        </VStack>

        <VStack spacing={3} align="stretch">
          <Heading as="h4" size="sm">
            Inventario:
          </Heading>
          <FormControl>
            <FormLabel fontSize="sm">Cantidad</FormLabel>
            <Input
              id="quantity"
              size="sm"
              type="text"
              value={bookDetails.quantity}
              onChange={(e) => handleDetailChange("quantity", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Estado</FormLabel>
            <Input
              id="status"
              size="sm"
              type="text"
              value={bookDetails.status}
              onChange={(e) => handleDetailChange("status", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Precio</FormLabel>
            <Input
              id="price"
              size="sm"
              type="text"
              value={bookDetails.price}
              onChange={(e) => handleDetailChange("price", e.target.value)}
            />
          </FormControl>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default BookDetailsForm;
