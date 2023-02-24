import React from 'react';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image
} from '@chakra-ui/react';


const EventCard = () => {
  
  return (
    <Center>
      <Box
        maxW={'205px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >

        <Box
          h={'110px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={10}
          pos={'relative'}
        >
          <Image src={'/images/palms.jpg'} layout={'fill'} />
        </Box>

        <Stack mt={10}>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            Event Name
          </Heading>
          
          <Text color={'gray.500'}>
            Location
          </Text>
        </Stack>

        <Stack mt={3} direction={'row'} spacing={4} align={'center'}>          
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={'gray.500'}>Feb 08, 2021</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
};

export default EventCard;