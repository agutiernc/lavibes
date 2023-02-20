import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConcertsApi from "../../api/api";
import {
  Heading,
  Flex,
  Box,
  FormControl,
  Input,
  Button
} from "@chakra-ui/react";

const SignupForm = () => {
  const navigate = useNavigate();
  const initialState = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  }

  const [formData, setFormData] = useState(initialState);

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
      const res = await ConcertsApi.signup(formData);
     
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
    <div>
      <Heading as='h2' textAlign='center' my='10' color='#048FC7'>
        Register
      </Heading>

      <Flex maxWidth="full" align="center" justifyContent="center">
        <Box p={5} maxWidth="sm" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box my={1}>
            <form onSubmit={handleSubmit} mx='auto'>
              <FormControl isRequired>
                <Input
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
                colorScheme='blue'
              >
                Sign Up
              </Button>

            </form>
          </Box>
        </Box>
      </Flex>
      
    </div>
  )
}

export default SignupForm;