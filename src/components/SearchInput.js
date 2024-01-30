import React from "react";
import {
  Box,
  VStack,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchInput = ({ query, setQuery, isISBN, setIsISBN, handleSearch }) => {
  const handleSwitchChange = (e) => {
    setIsISBN(e.target.checked);
    if (e.target.checked) {
      setQuery("");
    }
  };

  return (
    <Box
      overflow="hidden"
      p={4}
      gap="4"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.400"
      backgroundColor="white"
    >
      <VStack as="form" onSubmit={handleSearch} spacing={4} align="stretch">
        <Heading as="h3" size="md">
          Buscar un libro
        </Heading>
        <Stack gap="1">
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              pr="4.5rem"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isISBN ? "Número ISBN" : "Titulo del libro"}
              autoFocus
            />
          </InputGroup>
          <FormControl display="flex" alignItems="center" gap="2">
            <Switch
              onChange={handleSwitchChange}
              checked={isISBN}
              id="is-ISBN-switch"
            />
            <FormLabel htmlFor="is-ISBN-switch" mb="0">
              Usar ISBN
            </FormLabel>
          </FormControl>
        </Stack>
      </VStack>
    </Box>
  );
};

export default SearchInput;
