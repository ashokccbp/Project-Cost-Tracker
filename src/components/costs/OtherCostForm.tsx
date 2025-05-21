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
import { useAppSelector } from '../../hooks/useAppSelector';
import { addOtherCost, updateOtherCost } from '../../store/slices/otherCostsSlice';
import { OtherCost } from '../../types';

interface OtherCostFormProps {
  isOpen: boolean;
  onClose: () => void;
  editCost: OtherCost | null;
}

const OtherCostForm = ({ isOpen, onClose, editCost }: OtherCostFormProps) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    if (editCost) {
      setDescription(editCost.description);
      setAmount(editCost.amount.toString());
    } else {
      setDescription('');
      setAmount('');
    }
  }, [editCost]);

  const handleSubmit = async () => {
    if (!description || !amount) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber < 0) {
      toast({
        title: 'Error',
        description: 'Amount must be a valid positive number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (editCost) {
        await dispatch(updateOtherCost({ id: editCost.id, description, amount: amountNumber }));
        toast({
          title: 'Success',
          description: 'Cost updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await dispatch(addOtherCost({ description, amount: amountNumber }));
        toast({
          title: 'Success',
          description: 'Cost added successfully',
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
        <ModalHeader>{editCost ? 'Edit Cost' : 'Add Other Cost'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input 
                placeholder="Enter cost description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.500'
                  fontSize='1.2em'
                  children='$'
                />
                <Input 
                  placeholder="Enter amount" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
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
            {editCost ? 'Update' : 'Add'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OtherCostForm;