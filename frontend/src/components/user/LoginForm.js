import React, { useState } from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import ConcertsApi from "../../api/api";

import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

const LoginForm = () => {
  const navigate = useNavigate();
  const initialValue = {
    username: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await ConcertsApi.login(formData);

    // investigate why res has success property
    // add code to try...catch
    // move code to <App /> ?
    // make redirect work
    console.log(res)
    if (res.success) {
      navigate('/');
    } else {
      setFormData(initialValue)
      return;
    }
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color='#048FC7'>Sign In</Heading>
        </Stack>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={5}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Input
                  type="text"
                  placeholder='Enter Username'
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  mb="4"
                />
              </FormControl>

              <FormControl>
                <Input
                  type="password"
                  placeholder='Enter Password'
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  mb="4"
                />
              </FormControl>


              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default LoginForm;