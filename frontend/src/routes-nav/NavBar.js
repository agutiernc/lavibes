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
              bg={'pink.500'}
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
      <HStack
        display={{ base: 'block', md: 'flex' }}
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
        spacing={{ base: 2, md: 3 }}
        alignItems="center"
      >
        <Link
          _hover={{
            textDecoration: 'none',
          }}
          href="/login"
        >
          <Button
            bg={'pink.600'}
            variant="solid"
            color={'white'}
            _hover={{ bg: 'pink.500' }}
            size={['sm', 'md']}
          >
            Sign in
          </Button>
        </Link>

        <Link
          _hover={{
            textDecoration: 'none',
          }}
          href="/signup"
        >
          <Button
            bg={'pink.600'}
            variant="solid"
            color={'white'}
            _hover={{ bg: 'pink.500' }}
            size={['sm', 'md']}
          >
            Sign up
          </Button>
        </Link>
      </HStack>
    )
  }

  return (
    <>
      <Box
        bg={useColorModeValue('#160254', '#0b1029')}
        px={5}
        boxShadow={"inset 0 0 0 1000px rgba(0, 0, 0, 0.2)"}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box color="#FFF">
            <Link
              href={`${currentUser ? '/events' : '/'}`}
              _hover={{
                textDecoration: 'none',
              }}
            >
              <HStack>
                <Box >
                  <Flex color={'pink.600'}>
                    <Icon as={GiPalmTree} boxSize={[6, 9]} mt={[0.5, 3]} />
                    <Text 
                      fontWeight={'bold'} 
                      fontFamily={'Oooh Baby'}
                      fontSize={['1xl', '2xl', '4xl']}
                      mt={[1.5, 2]}
                    >
                      LA Vibes
                    </Text>
                    <Icon as={HiMusicalNote} boxSize={[3, 4]} mt={[0.5, 3]} style={{ filter:  "drop-shadow(0px 0px 0.8px white)" }} />
                  </Flex>
                </Box>
                
              </HStack>
            </Link>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode} borderRadius="50%" bg="pink.500" size={['xs', 'sm']} mt={1}>
                {colorMode === 'light' ? <MoonIcon color={'white'} /> : <SunIcon color={'white'} />}
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