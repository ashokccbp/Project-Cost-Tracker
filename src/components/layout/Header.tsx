import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { Menu, X, LogOut, Clipboard } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { signOut } from '../../store/slices/authSlice';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        position="sticky"
        top="0"
        zIndex="sticky"
        boxShadow="sm"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <X size={24} /> : <Menu size={24} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <HStack spacing={2}>
            <Clipboard size={24} color="blue.500" />
            <Heading
              as="h1"
              size="md"
              textAlign={useColorModeValue('left', 'left')}
              color={useColorModeValue('blue.500', 'white')}
            >
              Project Cost Tracker
            </Heading>
          </HStack>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
          align="center"
        >
          {user && (
            <>
              <Text display={{ base: 'none', md: 'block' }}>
                {user.email}
              </Text>
              <Button
                leftIcon={<LogOut size={18} />}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                colorScheme="red"
                variant="outline"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
              <IconButton
                aria-label="Sign out"
                icon={<LogOut size={18} />}
                display={{ base: 'inline-flex', md: 'none' }}
                colorScheme="red"
                variant="outline"
                onClick={handleSignOut}
              />
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav handleSignOut={handleSignOut} userEmail={user?.email} />
      </Collapse>
    </Box>
  );
};

interface MobileNavProps {
  handleSignOut: () => void;
  userEmail: string | null | undefined;
}

const MobileNav = ({ handleSignOut, userEmail }: MobileNavProps) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      {userEmail && (
        <Flex
          py={2}
          justify={'space-between'}
          align={'center'}
        >
          <Text fontWeight={600} color={'gray.600'}>
            {userEmail}
          </Text>
          <Button
            size="sm"
            leftIcon={<LogOut size={16} />}
            colorScheme="red"
            variant="outline"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Flex>
      )}
    </Stack>
  );
};

export default Header;