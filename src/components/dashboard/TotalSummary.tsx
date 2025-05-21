import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Text,
  SimpleGrid,
  CircularProgress,
  CircularProgressLabel,
  Card,
  CardBody,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/useAppSelector';

const TotalSummary = () => {
  const items = useAppSelector(state => state.items.items);
  const otherCosts = useAppSelector(state => state.otherCosts.otherCosts);
  const [totalItemsCost, setTotalItemsCost] = useState(0);
  const [totalOtherCosts, setTotalOtherCosts] = useState(0);
  const [totalProjectCost, setTotalProjectCost] = useState(0);
  const [itemsPercentage, setItemsPercentage] = useState(0);
  const [otherCostsPercentage, setOtherCostsPercentage] = useState(0);

  useEffect(() => {
    const itemsCost = items.reduce((sum, item) => sum + item.cost, 0);
    const otherCostsAmount = otherCosts.reduce((sum, cost) => sum + cost.amount, 0);
    const total = itemsCost + otherCostsAmount;

    setTotalItemsCost(itemsCost);
    setTotalOtherCosts(otherCostsAmount);
    setTotalProjectCost(total);

    if (total > 0) {
      setItemsPercentage(Math.round((itemsCost / total) * 100));
      setOtherCostsPercentage(Math.round((otherCostsAmount / total) * 100));
    } else {
      setItemsPercentage(0);
      setOtherCostsPercentage(0);
    }
  }, [items, otherCosts]);

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box w="full" p={5} borderRadius="md" bg={cardBg} border="1px" borderColor={borderColor}>
      <Heading size="md" mb={4}>Project Cost Summary</Heading>
      
      <StatGroup mb={6}>
        <Stat>
          <StatLabel fontSize="sm" color="gray.500">Total Project Cost</StatLabel>
          <StatNumber fontSize="2xl" color="blue.500">
            ${totalProjectCost.toFixed(2)}
          </StatNumber>
        </Stat>
      </StatGroup>
      
      <Divider mb={6} />
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card variant="outline" p={0} h="full">
          <CardBody>
            <Flex direction="row" align="center" justify="space-between">
              <Box>
                <Text fontSize="lg" fontWeight="medium" mb={1}>
                  Items Cost
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="blue.400">
                  ${totalItemsCost.toFixed(2)}
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  {items.length} items
                </Text>
              </Box>
              <CircularProgress value={itemsPercentage} color="blue.400" size="80px">
                <CircularProgressLabel>{itemsPercentage}%</CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </CardBody>
        </Card>
        
        <Card variant="outline" p={0} h="full">
          <CardBody>
            <Flex direction="row" align="center" justify="space-between">
              <Box>
                <Text fontSize="lg" fontWeight="medium" mb={1}>
                  Other Costs
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="teal.400">
                  ${totalOtherCosts.toFixed(2)}
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  {otherCosts.length} additional costs
                </Text>
              </Box>
              <CircularProgress value={otherCostsPercentage} color="teal.400" size="80px">
                <CircularProgressLabel>{otherCostsPercentage}%</CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default TotalSummary;