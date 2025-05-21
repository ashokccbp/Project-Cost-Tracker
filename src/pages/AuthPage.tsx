import { useState } from 'react';
import { Box, Container, VStack, Image, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Clipboard } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <Flex minH="100vh" bg="gray.50" align="center" justify="center">
      <Container maxW="container.xl" py={12}>
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          bg="white" 
          shadow="lg" 
          borderRadius="lg" 
          overflow="hidden"
        >
          <Box 
            w={{ base: 'full', md: '45%' }} 
            bg="blue.500" 
            color="white"
            p={{ base: 8, md: 12 }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <VStack spacing={6} align="flex-start" w="full">
              <Flex align="center">
                <Clipboard size={32} />
                <Heading size="lg" ml={2}>
                  Project Cost Tracker
                </Heading>
              </Flex>
              
              <Heading size="md">
                Track and manage all your project costs in one place
              </Heading>
              
              <Text fontSize="lg">
                Easily add items, track expenses, and visualize your project budget 
                with our intuitive cost tracking tool.
              </Text>
              
              <VStack spacing={3} align="flex-start" mt={8}>
                <Flex align="center">
                  <Box bg="white" color="blue.500" borderRadius="full" p={1} mr={2}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </Box>
                  <Text>Track both items and additional costs</Text>
                </Flex>
                
                <Flex align="center">
                  <Box bg="white" color="blue.500" borderRadius="full" p={1} mr={2}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </Box>
                  <Text>Real-time cost calculations</Text>
                </Flex>
                
                <Flex align="center">
                  <Box bg="white" color="blue.500" borderRadius="full" p={1} mr={2}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </Box>
                  <Text>Secure cloud storage</Text>
                </Flex>
              </VStack>
            </VStack>
          </Box>
          
          <VStack 
            w={{ base: 'full', md: '55%' }} 
            p={{ base: 4, md: 12 }}
            spacing={8}
            align="center"
            justify="center"
          >
            {isLogin ? (
              <LoginForm onToggleForm={toggleForm} />
            ) : (
              <RegisterForm onToggleForm={toggleForm} />
            )}
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;