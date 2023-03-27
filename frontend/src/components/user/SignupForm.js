import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import {
  Heading,
  Flex,
  Box,
  FormControl,
  Input,
  Button
} from "@chakra-ui/react";

const SignupForm = ({ signup }) => {
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
    <Box py={33} height={'100vh'}>
      <Heading as='h2' textAlign='center' color='#048FC7' mb={10}>
        Register
      </Heading>

      <Flex maxWidth="full" align="center" justifyContent="center">
        <Box p={5} maxWidth="sm" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box my={1}>
            <form onSubmit={handleSubmit} mx='auto'>
              <FormControl isRequired>
                <Input
                  focusBorderColor='pink.400'
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  mb="3"
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  focusBorderColor='pink.400'
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  mb="3"
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  focusBorderColor='pink.400'
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  mb="3"
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  focusBorderColor='pink.400'
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  mb="3"
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  focusBorderColor='pink.400'
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
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
        </Box>
      </Flex>
    </Box>
  )
}

export default SignupForm;