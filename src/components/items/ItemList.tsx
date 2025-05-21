import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Text,
  Badge,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spinner,
  HStack,
  Select,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { Edit, Trash, Plus, Search, RefreshCw } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchItems, deleteItem } from '../../store/slices/itemsSlice';
import { Item } from '../../types';
import ItemForm from './ItemForm';
import { useRef } from 'react';

const ItemList = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector(state => state.items);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'cost'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleEdit = (item: Item) => {
    setEditItem(item);
    onFormOpen();
  };

  const handleDelete = (id: string) => {
    setDeleteItemId(id);
    onAlertOpen();
  };

  const confirmDelete = async () => {
    if (deleteItemId) {
      await dispatch(deleteItem(deleteItemId));
      onAlertClose();
    }
  };

  const handleAddNew = () => {
    setEditItem(null);
    onFormOpen();
  };

  const handleRefresh = () => {
    dispatch(fetchItems());
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value as 'name' | 'cost');
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const sortedAndFilteredItems = [...items]
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else {
        return sortDirection === 'asc' 
          ? a.cost - b.cost 
          : b.cost - a.cost;
      }
    });

  const totalItemsCost = sortedAndFilteredItems.reduce((sum, item) => sum + item.cost, 0);

  return (
    <Box w="full" p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Project Items</Heading>
        <HStack>
          <Button leftIcon={<Plus size={18} />} colorScheme="blue" onClick={handleAddNew}>
            Add Item
          </Button>
          <IconButton 
            aria-label="Refresh items" 
            icon={<RefreshCw size={18} />} 
            onClick={handleRefresh}
          />
        </HStack>
      </Flex>

      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <HStack>
          <InputGroup maxW="250px">
            <InputLeftElement pointerEvents="none">
              <Search size={18} color="gray.500" />
            </InputLeftElement>
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </HStack>
        <HStack>
          <Select value={sortField} onChange={handleSortChange} size="md" w="150px">
            <option value="name">Sort by Name</option>
            <option value="cost">Sort by Cost</option>
          </Select>
          <Button onClick={toggleSortDirection} size="md">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </Button>
        </HStack>
      </Flex>

      {isLoading ? (
        <Flex justify="center" align="center" height="200px">
          <Spinner size="xl" />
        </Flex>
      ) : sortedAndFilteredItems.length > 0 ? (
        <>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th isNumeric>Cost</Th>
                  <Th width="100px">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedAndFilteredItems.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td isNumeric>${item.cost.toFixed(2)}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="Edit item"
                          icon={<Edit size={16} />}
                          size="sm"
                          onClick={() => handleEdit(item)}
                        />
                        <IconButton
                          aria-label="Delete item"
                          icon={<Trash size={16} />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(item.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          
          <Flex justifyContent="flex-end" mt={4}>
            <Badge colorScheme="blue" p={2} borderRadius="md">
              <Text fontWeight="bold">
                Total Items Cost: ${totalItemsCost.toFixed(2)}
              </Text>
            </Badge>
          </Flex>
        </>
      ) : (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.500">
            No items found. Add your first item!
          </Text>
        </Box>
      )}

      <ItemForm isOpen={isFormOpen} onClose={onFormClose} editItem={editItem} />

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ItemList;