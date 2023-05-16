import React, { useState, useContext, Fragment, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from './UserContext';
import NoUserEvents from './NoUserEvents';
import LoadingSpinner from '../common/LoadingSpinner';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import {
  Container,
  Flex,
  Stack,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Avatar,
  Text,
  Heading,
  CloseButton,
  Icon
} from '@chakra-ui/react';

const UserEvents = () => {
  const { currentUser, removeUserEvent } = useContext(UserContext);
  const [savedEvents, setSavedEvents] = useState([]);
  const bg1 = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('black', 'white');
  const textColor2 = useColorModeValue('gray.600', 'gray.200');
  const stackColor1 = useColorModeValue('gray.100', 'gray.800');
  const stackColor2 = useColorModeValue(
    '2px 6px 8px rgba(160, 174, 192, 0.6)',
    '2px 6px 8px rgba(9, 17, 28, 0.9)'
  );
  
  // add user's events to state if current user exists
  useEffect(() => {
    if (currentUser) {
      setSavedEvents(currentUser.events);
    }
  }, [currentUser]);

  // redirect if not current user
  if (!currentUser) {
    return <Navigate to={'/'} />;
  }

  // show loading spinner if currentUser info is not loaded yet
  if (!currentUser) {
    return (
      <LoadingSpinner />
    )
  }
  
  const handleDeleteBtn = (username, eventId) => {
    try {
      removeUserEvent(username, eventId);

      // remove the event from savedEvents array
      const newSavedEvents = savedEvents.filter(event => event.id !== eventId);

      // update state with the new savedEvents array
      setSavedEvents(newSavedEvents);
    } catch (err) {
      console.log('Unable to delete event');
    }
  };

  return (
    <Container maxW="3xl" p={{ base: 15, md: 20 }} minH={'90vh'}>
      <Heading textAlign={'center'} mb={10} color={'pink.700'}>Saved Events</Heading>
      <VStack
        bg={stackColor1}
        boxShadow={stackColor2}
        rounded="md"
        overflow="hidden"
        spacing={0}
      >
        { savedEvents.length === 0 ? <NoUserEvents /> : savedEvents.map((event) => (
          <Fragment key={event.id}>
            <Flex
              w="100%"
              justify="space-between"
              alignItems="center"
              _hover={{ bg: bg1 }}
            >
              <Stack spacing={0} direction="row" alignItems="center">
                <Flex p={4}>
                  <Link to={`/events/${event.id}`}>
                    <Avatar size="md" name={event.artist} src={''} />
                  </Link>
                </Flex>
                
                <Flex direction="column" p={2}>
                  <Link to={`/events/${event.id}`}>
                    <Text
                      color={textColor}
                      fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                    >
                      {event.artist} @ {event.location}
                    </Text>
                    <Text
                      color={textColor2}
                      fontSize={{ base: 'sm', sm: 'md' }}
                    >
                      {event.event_date} @ {event.start_time}
                    </Text>
                  </Link>
                </Flex>
              </Stack>

              <Flex p={4}>
                <CloseButton
                  size={'md'}
                  onClick={() => handleDeleteBtn(currentUser.username, event.id)}
                />
              </Flex>
            </Flex>

            <Divider m={0} />
          </Fragment>
        ))}
      </VStack>

      <Link to="/events">
        <HStack alignItems={'center'} justifyContent={'center'} mt={[5, 16]} pb={10} mb={5}>

          <Icon as={FaRegArrowAltCircleLeft} color={'pink.700'} boxSize={5} />
          <Text textAlign={'center'} fontSize={['1rem', '1.2rem']} color={'pink.700'}>Back To Events</Text>
        </HStack>
      </Link>
    </Container>
  );
};

export default UserEvents;