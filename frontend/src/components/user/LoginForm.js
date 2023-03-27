import React, { useState, useContext } from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import UserContext from './UserContext';
import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text
} from '@chakra-ui/react';

import Notify from '../common/Notify';

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.700')
  const { currentUser, message, setMessage } = useContext(UserContext);
  const initialValue = {
    username: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialValue);

  // redirect currently logged user to events page
  if (currentUser) {
    return <Navigate to='/events' />
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

    const res = await login(formData);
    
    // redirect successfully logged in user to main page
    if (res.success) {
      navigate('/events');
    } else {
      setMessage({ msg: 'Incorrect Username or Password', type: 'error' })
      setFormData(initialValue)

      return;
    }
  }

  return (
    <Flex justify={'center'} height={"100vh"} pt={33}>
      <Stack spacing={6} mx={'auto'} minHeight="calc(100vh - 60px)" px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color='#048FC7'>Sign In</Heading>
          <Notify message={message} />
        </Stack>

        <Box
          rounded={'lg'}
          bg={bgColor}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={5}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Input
                  focusBorderColor='pink.400'
                  type="text"
                  placeholder='Enter Username'
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  mb="4"
                  required
                />
              </FormControl>

              <FormControl>
                <Input
                  focusBorderColor='pink.400'
                  type="password"
                  placeholder='Enter Password'
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  mb="4"
                  required
                />
              </FormControl>


              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={'pink.600'}
                  color={'white'}
                  _hover={{
                    bg: 'pink.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>

          <Box mt={3} fontSize={'14px'} textAlign='center'>
            Don't have an account? 
            <NavLink to="/signup">
              <Text color='#cf5f9a' fontWeight={'bold'}>Sign up here!</Text>
            </NavLink>
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
}

export default LoginForm;