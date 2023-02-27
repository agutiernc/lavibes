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


const EventCard = ({ event }) => {
  const city = event.Location.substring(event.Location.indexOf("\n") + 1, event.Location.indexOf(", CA"))
  const eventDate = new Date(event.Concert_Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  // get the start and end times for an event
  const getTime = (str) => {
    const dateObj = new Date(str);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    let nonMilitaryTime;

    if (hours === 0) {
      nonMilitaryTime = 12;
    } else if (hours > 12) {
      nonMilitaryTime = hours - 12;
    } else {
      nonMilitaryTime = hours;
    }

    const time = `${nonMilitaryTime}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

    return time;
  }

  return (
    <Center>
      <Box
        maxW={'205px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={3}
        overflow={'hidden'}
        h={'310px'}
      >

        <Box
          h={'105px'}
          bg={'gray.100'}
          mt={-4}
          mx={-6}
          mb={7}
          pos={'relative'}
        >
          <Image src={'/images/palms.jpg'} layout={'fill'} />
        </Box>

        <Stack mt={14}>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={14}
            fontFamily={'body'}
            align={'center'}
          >
            {event.Performing_Artist}
          </Heading>
          
          <Text color={'gray.500'} fontSize={12} align={'center'} mb={10}>
            {event.Concert_Location} <br /> in {city}
          </Text>
        </Stack>

        <Stack mt={1} direction={'row'} spacing={4} pl={2}>          
          <Stack direction={'column'} spacing={0}>
            <Text fontWeight={600} fontSize={'md'} mt={3}>{eventDate}</Text>
            <Text color={'gray.500'} fontSize={11}>
             {getTime(event.Start_Time)} - {getTime(event.End_Time)}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
};

export default EventCard;

/**
 * - each card needs to be same size
 * - spacing between cards (top/bottom)
 */