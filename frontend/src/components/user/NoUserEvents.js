import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Icon, HStack, Center } from '@chakra-ui/react';
import { FaRegSadTear, FaMusic } from 'react-icons/fa';
import { GiPalmTree } from 'react-icons/gi';

const NoUserEvents = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Center>
        <HStack>
          <Icon as={GiPalmTree} boxSize={'50px'} color={'blue.500'} />
          <Icon as={FaRegSadTear} boxSize={'50px'} color={'blue.500'} />
          <Icon as={FaMusic} boxSize={'50px'} color={'blue.500'} />
        </HStack>
      </Center>

      <Heading as="h2" size="xl" mt={6} mb={2}>
        You have no events saved
      </Heading>

      <Text color={'gray.500'}>
        <Link to={'/events'}>Click here to browser events to save.</Link>
      </Text>
    </Box>
  );
}

export default NoUserEvents;