import React, { useContext } from "react";
import UserContext from "../components/user/UserContext";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // useDisclosure,
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  Center,
  Icon,
  Link,
  Text
} from '@chakra-ui/react';

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // display when a user is logged in
  const loggedIn = () => {
    return (
      <Box>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar
              size={'sm'}
              icon={<Icon as={FaUser} />}
            />
          </MenuButton>

          <MenuList alignItems={'center'} minWidth='175px'>
            <br />

            <Center>
              <Avatar
                size={'md'}
                icon={<Icon as={FaUser} />}
              />
            </Center>
            <br />

            <Center>
              <Text fontWeight={'bold'} fontSize={20}>
                {currentUser.username}
              </Text>
            </Center>
            <br />

            <MenuDivider />

            <MenuItem>
              <Link
                href="/settings"
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Account Settings
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                href="/"
                onClick={logout}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Logout
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    )
  }

  // display when a user is logged out
  const loggedOut = () => {
    return (
      <HStack spacing={3}>
        <Link
          _hover={{
            textDecoration: 'none',
          }}
          href="/login"
        >
          <Button colorScheme="whiteAlpha" variant="solid">
            Sign in
          </Button>
        </Link>

        <Link
          _hover={{
            textDecoration: 'none',
          }}
          href="/signup"
        >
          <Button colorScheme="whiteAlpha" variant="solid">
            Sign up
          </Button>
        </Link>
      </HStack>
    )
  }

  return (
    <>
      <Box bg={useColorModeValue('#27048c', '#0b1029')} px={9}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box color="#FFF">LA Vibes</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>

              <Button onClick={toggleColorMode} rounded={'full'} colorScheme="teal">
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {currentUser ? loggedIn() : loggedOut()}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default NavBar;

/**
 * Needs:
 *  - better logo
 */