import React, { useRef } from "react";
import {
    Button,
    Heading,
    VStack,
    StackDivider,
    Text,
    IconButton,
    Tooltip,
    HStack,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Center
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ArrowRightIcon, DownloadIcon } from "@chakra-ui/icons";

const ExpandedListContent = ({ onToggleExpand, onDeleteBook, handleExport, booksList, onEditBook, onClearBooksList, booksCount }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    const reversedBooksList = [...booksList].reverse();

    return (
        <VStack
            spacing={4}
            align="stretch"
            minW={"20vw"}
        >
            <HStack>
                <HStack flex={1} gap={2}>
                    <Heading as="h3" size="md" >
                        Lista de libros
                    </Heading>
                    {booksList.length > 0 &&
                        <Tooltip hasArrow label='Libros guardados' placement='top'>
                            <Center
                                bgColor={booksCount === 0 ? "gray.100" : "blue.100"}
                                width={"40px"}
                                height={"40px"}
                                borderRadius={"50%"}
                            ><Text>{booksCount}</Text>
                            </Center>
                        </Tooltip>}
                </HStack>
                <Tooltip hasArrow label='Colapsar' placement='top'>
                    <IconButton
                        aria-label="Colapsar"
                        icon={<ArrowRightIcon />}
                        onClick={onToggleExpand}
                        colorScheme="gray"
                        variant='ghost'
                    />
                </Tooltip>

            </HStack>


            <HStack>
                <Button
                    flex="3"
                    onClick={handleExport}
                    colorScheme="green"
                    isDisabled={booksList.length === 0}
                    leftIcon={<DownloadIcon />}
                >
                    Exportar
                </Button>
                <Button flex="1" colorScheme='red' variant='outline' onClick={onOpen} isDisabled={booksList.length === 0}>
                    Vaciar
                </Button>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Vaciar lista de libros
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                ¿Estás seguro? Esta acción no se puede deshacer.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    No, cancelar
                                </Button>
                                <Button colorScheme='red' onClick={() => { onClearBooksList(); onClose(); }} ml={3}>
                                    Vaciar
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>

            </HStack>
            <VStack
                divider={<StackDivider borderColor="gray.400" />}
                spacing={4}
                align="stretch"
                overflowY="auto"
                flex="1"
            >
                {booksList.length === 0 && (
                    <Text color="gray.500">
                        Agrega libros a la lista para poder exportar
                    </Text>
                )}
                {reversedBooksList.map((book, index) => (
                    <Box
                        direction={{ base: "column", sm: "row" }}
                        p={0}
                        variant="alpha"
                        key={index}
                        width="100%"
                    >
                        <HStack>
                            <VStack p={0} flex="1" alignItems="flex-start">
                                <Heading as="h4" size="sm">
                                    {book.title} - {book.author}
                                </Heading>
                                <Text fontSize="sm">
                                    {book.book_id || "Sin Nº de articulo"}
                                </Text>
                            </VStack>

                            <HStack gap={2}>
                                <Tooltip hasArrow label='Editar' placement='top'>
                                    <IconButton
                                        size="sm"
                                        variant='outline'
                                        colorScheme='blue'
                                        aria-label='Editar'
                                        icon={<EditIcon />}
                                        onClick={() => onEditBook(book)}
                                    />
                                </Tooltip>
                                <Tooltip hasArrow label='Borrar' placement='top'>
                                    <IconButton
                                        size="sm"
                                        variant='outline'
                                        colorScheme="red"
                                        aria-label='Borrar'
                                        icon={<DeleteIcon />}
                                        onClick={() => onDeleteBook(book.book_id)}
                                    />
                                </Tooltip>
                            </HStack>

                        </HStack>
                    </Box>
                ))}
            </VStack>

        </VStack>
    );
};

export default ExpandedListContent;