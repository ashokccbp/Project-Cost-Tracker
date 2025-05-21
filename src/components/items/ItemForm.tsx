import { useState, useEffect } from 'react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  VStack,
  useToast,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addItem, updateItem } from '../../store/slices/itemsSlice';
import { Item } from '../../types';

interface ItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  editItem: Item | null;
}

const ItemForm = ({ isOpen, onClose, editItem }: ItemFormProps) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setCost(editItem.cost.toString());
    } else {
      setName('');
      setCost('');
    }
  }, [editItem]);

  const handleSubmit = async () => {
    if (!name || !cost) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const costNumber = parseFloat(cost);
    if (isNaN(costNumber) || costNumber < 0) {
      toast({
        title: 'Error',
        description: 'Cost must be a valid positive number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (editItem) {
        await dispatch(updateItem({ id: editItem.id, name, cost: costNumber }));
        toast({
          title: 'Success',
          description: 'Item updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await dispatch(addItem({ name, cost: costNumber }));
        toast({
          title: 'Success',
          description: 'Item added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editItem ? 'Edit Item' : 'Add New Item'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Item Name</FormLabel>
              <Input 
                placeholder="Enter item name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Cost</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.500'
                  fontSize='1.2em'
                  children='$'
                />
                <Input 
                  placeholder="Enter cost" 
                  value={cost} 
                  onChange={(e) => setCost(e.target.value)}
                  type="number"
                  step="0.01"
                  min="0"
                />
              </InputGroup>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {editItem ? 'Update' : 'Add'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ItemForm;