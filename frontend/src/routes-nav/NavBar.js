import React, { useContext } from "react";
import UserContext from "../components/user/UserContext";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import { GiPalmTree } from 'react-icons/gi';
import { HiMusicalNote } from 'react-icons/hi2';
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
  useColorModeValue,
  Stack,
  HStack,
  VStack,
  useColorMode,
  Center,
  Icon,
  Link,
  Text
} from '@chakra-ui/react';

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();

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
                href={`/user/${currentUser.username}/settings`}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Account Settings
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                href={`/user/${currentUser.username}/events`}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Saved Events
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
          <Button colorScheme="pink" variant="solid">
            Sign in
          </Button>
        </Link>

        <Link
          _hover={{
            textDecoration: 'none',
          }}
          href="/signup"
        >
          <Button colorScheme="pink" variant="solid">
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
          <Box color="#FFF">
            <Link
              href={`${currentUser ? '/events' : '/'}`}
              _hover={{
                textDecoration: 'none',
              }}
            >
              <VStack>
                <Box>
                  <Flex color={'pink.600'}>
                    <Icon as={GiPalmTree} boxSize={9} />
                    <Text 
                      fontWeight={'bold'} 
                      fontFamily={'Oooh Baby'}
                      fontSize={'3xl'}
                    >
                      LA Vibes
                    </Text>
                    <Icon as={HiMusicalNote} boxSize={4} />
                  </Flex>
                </Box>
                
              </VStack>
            </Link>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode} rounded={'full'} colorScheme="teal" size='sm' mt={1}>
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