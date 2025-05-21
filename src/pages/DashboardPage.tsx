import { useEffect } from 'react';
import { 
  Box, 
  Container, 
  SimpleGrid, 
  VStack, 
  useToast,
  useDisclosure 
} from '@chakra-ui/react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchItems } from '../store/slices/itemsSlice';
import { fetchOtherCosts } from '../store/slices/otherCostsSlice';
import Header from '../components/layout/Header';
import TotalSummary from '../components/dashboard/TotalSummary';
import ItemList from '../components/items/ItemList';
import OtherCostList from '../components/costs/OtherCostList';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  
  const { error: itemsError } = useAppSelector(state => state.items);
  const { error: costsError } = useAppSelector(state => state.otherCosts);
  
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchOtherCosts());
  }, [dispatch]);
  
  useEffect(() => {
    if (itemsError) {
      toast({
        title: 'Error loading items',
        description: itemsError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    
    if (costsError) {
      toast({
        title: 'Error loading costs',
        description: costsError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [itemsError, costsError, toast]);
  
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW="container.xl" py={5}>
        <VStack spacing={6} align="stretch">
          <TotalSummary />
          
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <ItemList />
            <OtherCostList />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default DashboardPage;