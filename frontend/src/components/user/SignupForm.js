import React, { useState, useContext } from "react";
import { useNavigate, Navigate, NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import {
  Heading,
  Flex,
  Box,
  FormControl,
  Input,
  Button,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

const SignupForm = ({ signup }) => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const placeHolderColors = useColorModeValue('gray.500', 'gray.400');
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const initialState = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  };

  const [formData, setFormData] = useState(initialState);

  // redirect currently logged user to events page
  if (currentUser) {
    return <Navigate to='/events' />;
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

    try {
      const res = await signup(formData);
     
      if (res) {
        navigate('/'); // redirect to main if success
      } else {
        return;
      }

    } catch (errors) {
      console.log('error: ', errors);
    }
  }

  return (
    <Box py={33} height={'90vh'}>
      <Heading as='h2' textAlign='center' color='pink.700' mb={10}>
        Register
      </Heading>

      <Flex maxWidth="full" align="center" justifyContent="center">
        <Box 
          p={8} 
          maxWidth="sm" 
          borderWidth={1} 
          borderRadius={8} 
          boxShadow="lg"
          bg={bgColor}
        >
          <Box my={1}>
            <form onSubmit={handleSubmit} mx='auto'>
              <FormControl isRequired>
                <Input
                  focusBorderColor='pink.400'
                  borderWidth={'2px'}
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  _placeholder={{ color: placeHolderColors }}
                  value={formData.username}
                  onChange={handleChange}
                  mb="3"
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  focusBorderColor='pink.400'
                  borderWidth={'2px'}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  _placeholder={{ color: placeHolderColors }}
                  value={formData.password}
                  onChange={handleChange}
                  mb="3"
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  focusBorderColor='pink.400'
                  borderWidth={'2px'}
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  _placeholder={{ color: placeHolderColors }}
                  value={formData.email}
                  onChange={handleChange}
                  mb="3"
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  focusBorderColor='pink.400'
                  borderWidth={'2px'}
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  _placeholder={{ color: placeHolderColors }}
                  value={formData.firstName}
                  onChange={handleChange}
                  mb="3"
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  focusBorderColor='pink.400'
                  borderWidth={'2px'}
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  _placeholder={{ color: placeHolderColors }}
                  value={formData.lastName}
                  onChange={handleChange}
                  mb="3"
                />
              </FormControl>

              <Button
                type="submit"
                mt='4'
                width='full'
                bg={'pink.600'}
                color={'white'}
                _hover={{ bg: 'pink.500' }}
              >
                Sign Up
              </Button>
            </form>
          </Box>

          <Box mt={3} fontSize={'14px'} textAlign='center'>
            Already have an account? 
            <NavLink to="/login">
              <Text color='#cf5f9a' fontWeight={'bold'}>Log in here!</Text>
            </NavLink>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default SignupForm;