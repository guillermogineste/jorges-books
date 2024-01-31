import React from 'react';
import { IconButton, VStack, Text, Tooltip, Center } from '@chakra-ui/react';
import { DownloadIcon, ArrowLeftIcon } from '@chakra-ui/icons';

const CompactListContent = ({ onToggleExpand, booksCount, handleExport, booksList }) => {
    return (
        <VStack
            spacing={4}
            align="stretch"
        >
            <Tooltip hasArrow label='Expandir' placement='top'>
                <IconButton
                    aria-label="Expand list"
                    icon={<ArrowLeftIcon />}
                    onClick={onToggleExpand}
                    colorScheme="gray"
                    variant='ghost'
                />
            </Tooltip>
            <Tooltip hasArrow label='Exportar' placement='top'>
                <IconButton
                    aria-label="Exportar lista"
                    icon={<DownloadIcon />}
                    onClick={handleExport}
                    colorScheme="green"
                    isDisabled={booksList.length === 0}
                />
            </Tooltip>
            <Tooltip hasArrow label='Libros guardados' placement='top'>
                <Center
                    bgColor={"gray.100"}
                    width={"40px"}
                    height={"40px"}
                    borderRadius={"50%"}
                ><Text>{booksCount}</Text></Center>
            </Tooltip>

        </VStack>
    );
};

export default CompactListContent;