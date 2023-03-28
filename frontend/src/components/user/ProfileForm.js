import React, { useState, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import ConcertsApi from '../../api/api';
import UserContext from './UserContext';
import { FaUser, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  HStack,
  Avatar,
  Center,
  Icon,
  Box,
  useColorModeValue,
  Text
} from '@chakra-ui/react';

const ProfileForm = () => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const placeHolderColors = useColorModeValue('gray.500', 'gray.400');
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const initialValue = currentUser ? {
    password: '',
    passwordVerify: '',
    email: currentUser.email,
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName
  } : null;

  const [formData, setFormData] = useState(initialValue);

  // redirect user if not current user
  if (!currentUser) {
    return <Navigate to='/' />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    }

    // verify password confirmation
    if (profileData.password !== formData.passwordVerify) {
      console.log("password don't match!")
      // add setMessage
      return;
    }

    let updatedUser;

    try {
      updatedUser = await ConcertsApi.saveProfile(currentUser.username, profileData);

      console.log('User info updated!')
    } catch (err) {
      console.log('unable to update user settings')

      return;
    }

    setFormData({ ...formData, password: '', passwordVerify: '' });
    setCurrentUser(updatedUser);
  }

  return (
    <Box height={['100vh', '90vh']} pt={35} mb={[88, 5]} pb={[18, 5, 20]}>
      <Flex align={'center'} justify={'center'} maxWidth={'full'}>
        <Stack
          spacing={4}
          w={'sm'}
          maxW={'md'}
          borderRadius={8}
          borderWidth={1} 
          boxShadow={'lg'}
          p={7}
          bg={bgColor}
        >
          <Heading
            lineHeight={1}
            fontSize={{ base: '2xl', sm: '3xl' }}
            textAlign={'center'}
            color={'pink.700'}
          >
            {currentUser.firstName}'s Settings
          </Heading>

          <FormControl id="userName">
            <Stack spacing={6}>
              <Center>
                <Avatar
                  size={'lg'}
                  icon={<Icon as={FaUser} />}
                  bg={'pink.500'}
                />
              </Center>
            </Stack>
          </FormControl>

          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                focusBorderColor='pink.400'
                borderWidth={'2px'}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                mb={2}
              />
            </FormControl>

            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                focusBorderColor='pink.400'
                borderWidth={'2px'}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                mb={2}
              />
            </FormControl>

            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                focusBorderColor='pink.400'
                borderWidth={'2px'}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                mb={2}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                focusBorderColor='pink.400'
                borderWidth={'2px'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter current password"
                _placeholder={{ color: placeHolderColors }}
                type="password"
                mb={2}
              />
            </FormControl>

            <FormControl id="password2" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                focusBorderColor='pink.400'
                borderWidth={'2px'}
                name='passwordVerify'
                value={formData.passwordVerify}
                onChange={handleChange}
                placeholder="Confirm password"
                _placeholder={{ color: placeHolderColors }}
                type="password"
                mb={4}
              />
            </FormControl>

            <Stack spacing={6} direction={['column', 'row']}>
              <Link to='/'>
                <Button
                  bg={'red.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'red.500',
                  }}>
                  Cancel
                </Button>
              </Link>

              <Button
                bg={'pink.600'}
                type="submit"
                color={'white'}
                w="full"
                _hover={{
                  bg: 'pink.500',
                }}>
                Submit
              </Button>
            </Stack>
          </form>

        </Stack>
      </Flex>

      <Link to="/events">
        <HStack 
          alignItems={'center'} 
          justifyContent={'center'}
          mt={[4, 10]}
          pb={[10, 5]} mb={[10, 10]}
        >
          <Icon as={FaRegArrowAltCircleLeft} color={'pink.700'} boxSize={5} />
          <Text textAlign={'center'} fontSize={['1rem', '1.2rem']} color={'pink.700'}>Back To Events</Text>
        </HStack>
      </Link>
    </Box>
  );
}

export default ProfileForm;

/**
 * - Add delete button next to avatar?
 * - Add alert to confirm changes?
 *     - chakra has an AlertDialog
 * - If updating first 3 fields, enter/confirm password
 * - If only updating password, confirm it too
 * - Chakra has a tooltip - maybefor for valid passwords?
 */