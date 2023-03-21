import React from 'react';
import { eventDate, getTime, randomImgURL } from '../../utils/utils';
import { Link } from 'react-router-dom';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

const EventCard = ({ event }) => {
  const city = event.Location.substring(event.Location.indexOf("\n") + 1, event.Location.indexOf(", CA"));
  const imgURL = randomImgURL();

  return (
    <Center>
      <Link to={`${event.ObjectId}`}>
        <Box
          maxW={'205px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={3}
          overflow={'hidden'}
        >

          <Box
            h={'105px'}
            bg={'gray.100'}
            mt={-4}
            mx={-6}
            mb={7}
            pos={'relative'}
          >
            <Image src={imgURL} layout={'fill'} />
          </Box>

          <Stack mt={14} spacing={3}>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={14}
              fontFamily={'body'}
              align={'center'}
              pb={-1}
            >
              {event.Performing_Artist}
            </Heading>

            <Text color={'gray.500'} fontSize={12} align={'center'}>
              {event.Concert_Location} <br /> in {city}
            </Text>
          </Stack>

          <Stack mt={0} direction={'row'} spacing={2} pl={2} pt={3}>
            <Stack direction={'column'} spacing={1}>
              <Text fontWeight={600} fontSize={'md'}>{eventDate(event.Concert_Date)}</Text>
              <Text color={'gray.500'} fontSize={12}>
                {getTime(event.Start_Time)} - {getTime(event.End_Time)}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Link>
    </Center>
  )
};

export default EventCard;