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
import { fetchOtherCosts, deleteOtherCost } from '../../store/slices/otherCostsSlice';
import { OtherCost } from '../../types';
import OtherCostForm from './OtherCostForm';
import { useRef } from 'react';

const OtherCostList = () => {
  const dispatch = useAppDispatch();
  const { otherCosts, isLoading } = useAppSelector(state => state.otherCosts);
  const [editCost, setEditCost] = useState<OtherCost | null>(null);
  const [deleteCostId, setDeleteCostId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'description' | 'amount'>('description');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef(null);

  useEffect(() => {
    dispatch(fetchOtherCosts());
  }, [dispatch]);

  const handleEdit = (cost: OtherCost) => {
    setEditCost(cost);
    onFormOpen();
  };

  const handleDelete = (id: string) => {
    setDeleteCostId(id);
    onAlertOpen();
  };

  const confirmDelete = async () => {
    if (deleteCostId) {
      await dispatch(deleteOtherCost(deleteCostId));
      onAlertClose();
    }
  };

  const handleAddNew = () => {
    setEditCost(null);
    onFormOpen();
  };

  const handleRefresh = () => {
    dispatch(fetchOtherCosts());
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value as 'description' | 'amount');
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const sortedAndFilteredCosts = [...otherCosts]
    .filter(cost => cost.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortField === 'description') {
        return sortDirection === 'asc' 
          ? a.description.localeCompare(b.description) 
          : b.description.localeCompare(a.description);
      } else {
        return sortDirection === 'asc' 
          ? a.amount - b.amount 
          : b.amount - a.amount;
      }
    });

  const totalCostsAmount = sortedAndFilteredCosts.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <Box w="full" p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Other Costs</Heading>
        <HStack>
          <Button leftIcon={<Plus size={18} />} colorScheme="blue" onClick={handleAddNew}>
            Add Cost
          </Button>
          <IconButton 
            aria-label="Refresh costs" 
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
              placeholder="Search costs..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </HStack>
        <HStack>
          <Select value={sortField} onChange={handleSortChange} size="md" w="180px">
            <option value="description">Sort by Description</option>
            <option value="amount">Sort by Amount</option>
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
      ) : sortedAndFilteredCosts.length > 0 ? (
        <>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Description</Th>
                  <Th isNumeric>Amount</Th>
                  <Th width="100px">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedAndFilteredCosts.map((cost) => (
                  <Tr key={cost.id}>
                    <Td>{cost.description}</Td>
                    <Td isNumeric>${cost.amount.toFixed(2)}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="Edit cost"
                          icon={<Edit size={16} />}
                          size="sm"
                          onClick={() => handleEdit(cost)}
                        />
                        <IconButton
                          aria-label="Delete cost"
                          icon={<Trash size={16} />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(cost.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          
          <Flex justifyContent="flex-end" mt={4}>
            <Badge colorScheme="teal" p={2} borderRadius="md">
              <Text fontWeight="bold">
                Total Other Costs: ${totalCostsAmount.toFixed(2)}
              </Text>
            </Badge>
          </Flex>
        </>
      ) : (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.500">
            No other costs found. Add your first cost!
          </Text>
        </Box>
      )}

      <OtherCostForm isOpen={isFormOpen} onClose={onFormClose} editCost={editCost} />

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Cost
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

export default OtherCostList;