import React, { useState, useEffect } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  StackDivider,
  Text,
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
      <Text fontSize="sm" color="gray">
        Completa los detalles necesarios
      </Text>
      <VStack
        divider={<StackDivider borderColor="gray.400" />}
        spacing={4}
        align="stretch"
      >
        <VStack spacing={4} align="stretch">
          <Heading as="h4" size="sm">
            General
          </Heading>
          <FormControl>
            <FormLabel>Nº de artículo:</FormLabel>
            <Input
              type="text"
              value={bookDetails.book_id}
              onChange={(e) => handleDetailChange("book_id", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>ISBN:</FormLabel>
            <Input
              type="text"
              value={bookDetails.isbn}
              onChange={(e) => handleDetailChange("isbn", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tipo de artículo:</FormLabel>
            <Input
              type="text"
              value={bookDetails.listing_type}
              onChange={(e) =>
                handleDetailChange("listing_type", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Titulo:</FormLabel>
            <Input
              type="text"
              value={bookDetails.title}
              onChange={(e) => handleDetailChange("title", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Autor:</FormLabel>
            <Input
              type="text"
              value={bookDetails.author}
              onChange={(e) => handleDetailChange("author", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ilustrador:</FormLabel>
            <Input
              type="text"
              value={bookDetails.illustrator}
              onChange={(e) =>
                handleDetailChange("illustrator", e.target.value)
              }
            />
          </FormControl>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Heading as="h4" size="sm">
            Atributos
          </Heading>
          <FormControl>
            <FormLabel>Estado:</FormLabel>
            <Select
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
            <FormLabel>Sobrecubierta:</FormLabel>
            <Select
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
            <FormLabel>Encuadernación:</FormLabel>
            <Select
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
            <FormLabel>Idioma:</FormLabel>
            <Select
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
          <FormControl>
            <FormLabel>Firma:</FormLabel>
            <Select
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
          <FormControl>
            <FormLabel>Edición:</FormLabel>
            <Select
              id="edition"
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
          <FormControl>
            <FormLabel>Tirada:</FormLabel>
            <Select
              id="printing"
              value={bookDetails.printing}
              onChange={(e) => handleDetailChange("printing", e.target.value)}
            >
              <option value="">No especificado</option>
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
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Volumen:</FormLabel>
            <Input
              type="text"
              value={bookDetails.volume}
              onChange={(e) => handleDetailChange("volume", e.target.value)}
            />
          </FormControl>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Heading as="h4" size="sm">
            Editorial
          </Heading>
          <FormControl>
            <FormLabel>Editorial:</FormLabel>
            <Input
              type="text"
              value={bookDetails.publisher}
              onChange={(e) => handleDetailChange("publisher", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Año:</FormLabel>
            <Input
              type="text"
              value={bookDetails.publisher_year}
              onChange={(e) =>
                handleDetailChange("publisher_year", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Lugar:</FormLabel>
            <Input
              type="text"
              value={bookDetails.publisher_place}
              onChange={(e) =>
                handleDetailChange("publisher_place", e.target.value)
              }
            />
          </FormControl>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Heading as="h4" size="sm">
            Información
          </Heading>
          <FormControl>
            <FormLabel>Descripción:</FormLabel>
            <Textarea
              value={bookDetails.description}
              onChange={(e) =>
                handleDetailChange("description", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Palabras clave:</FormLabel>
            <Input
              type="text"
              value={bookDetails.keywords}
              onChange={(e) => handleDetailChange("keywords", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Notas Privadas:</FormLabel>
            <Textarea
              value={bookDetails.private_notes}
              onChange={(e) =>
                handleDetailChange("private_notes", e.target.value)
              }
            />
          </FormControl>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Heading as="h4" size="sm">
            Atributos Físicos
          </Heading>
          <FormControl>
            <FormLabel>Tamaño:</FormLabel>
            <Input
              type="text"
              value={bookDetails.size}
              onChange={(e) => handleDetailChange("size", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Peso:</FormLabel>
            <Input
              type="text"
              value={bookDetails.weight}
              onChange={(e) => handleDetailChange("weight", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Unidades de peso:</FormLabel>
            <Input
              type="text"
              value={bookDetails.weight_units}
              onChange={(e) =>
                handleDetailChange("weight_units", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Páginas:</FormLabel>
            <Input
              type="text"
              value={bookDetails.page_count}
              onChange={(e) => handleDetailChange("page_count", e.target.value)}
            />
          </FormControl>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Heading as="h4" size="sm">
            Inventario:
          </Heading>
          <FormControl>
            <FormLabel>Cantidad:</FormLabel>
            <Input
              type="text"
              value={bookDetails.quantity}
              onChange={(e) => handleDetailChange("quantity", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Estado:</FormLabel>
            <Input
              type="text"
              value={bookDetails.status}
              onChange={(e) => handleDetailChange("status", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Coste:</FormLabel>
            <Input
              type="text"
              value={bookDetails.cost}
              onChange={(e) => handleDetailChange("cost", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Situación:</FormLabel>
            <Input
              type="text"
              value={bookDetails.inventory_location}
              onChange={(e) =>
                handleDetailChange("inventory_location", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Precio:</FormLabel>
            <Input
              type="text"
              value={bookDetails.price}
              onChange={(e) => handleDetailChange("price", e.target.value)}
            />
          </FormControl>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Heading as="h4" size="sm">
            Resumen
          </Heading>
          <FormControl>
            <FormLabel>Resumen:</FormLabel>
            <Textarea
              value={bookDetails.synopsis}
              onChange={(e) => handleDetailChange("synopsis", e.target.value)}
            />
          </FormControl>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Heading as="h4" size="sm">
            Categorías
          </Heading>
          <FormControl>
            <FormLabel>Categorías:</FormLabel>
            <Input
              type="text"
              value={bookDetails.categories}
              onChange={(e) => handleDetailChange("categories", e.target.value)}
            />
          </FormControl>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Heading as="h4" size="sm">
            Catálogos
          </Heading>
          <FormControl>
            <FormLabel>Catálogos:</FormLabel>
            <Input
              type="text"
              value={bookDetails.catalogs}
              onChange={(e) => handleDetailChange("catalogs", e.target.value)}
            />
          </FormControl>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default BookDetailsForm;
