import React, { useState, useContext } from 'react';
import UserContext from './UserContext';
import { Fragment } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import {
  Container,
  Flex,
  Stack,
  VStack,
  Icon,
  Divider,
  useColorModeValue,
  Avatar,
  Text,
  Heading
} from '@chakra-ui/react';

const UserEvents = () => {
  const { currentUser } = useContext(UserContext);
  const [savedEvents, setSavedEvents] = useState(currentUser.events);
  const bg1 = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('black', 'white')
  const textColor2 = useColorModeValue('gray.400', 'gray.200')
  // console.log(savedEvents)

  // const handleDeleteBtn = (eventId) => {
  //   // remove the event from savedEvents array
  //   const newSavedEvents = savedEvents.filter(event => event.id !== eventId);

  //   // update state with the new savedEvents array
  //   setSavedEvents(newSavedEvents);
  // };

  return (
    <Container maxW="3xl" p={{ base: 5, md: 10 }}>
      <Heading textAlign={'center'} mb={10}>Saved Events</Heading>
      <VStack
        boxShadow={useColorModeValue(
          '2px 6px 8px rgba(160, 174, 192, 0.6)',
          '2px 6px 8px rgba(9, 17, 28, 0.9)'
        )}
        bg={useColorModeValue('gray.100', 'gray.800')}
        rounded="md"
        overflow="hidden"
        spacing={0}
      >
        {savedEvents.map((event, index) => (
          <Fragment key={index}>
            <Flex
              w="100%"
              justify="space-between"
              alignItems="center"
              _hover={{ bg: bg1 }}
            >
              <Stack spacing={0} direction="row" alignItems="center">
                <Flex p={4}>
                  <Avatar size="md" name={event.artist} src={''} />
                </Flex>
                
                <Flex direction="column" p={2}>
                  <Text
                    color={textColor}
                    fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                    dangerouslySetInnerHTML={{ __html: event.artist }}
                  />
                  <Text
                    color={textColor2}
                    fontSize={{ base: 'sm', sm: 'md' }}
                  >
                    Jun 11
                  </Text>
                </Flex>
              </Stack>
              {/* {notification.isOnline && (
                <Flex p={4}>
                  <Icon as={GoPrimitiveDot} w={5} h={5} color="blue.400" />
                </Flex>
              )} */}
            </Flex>
            {/* {notifications.length - 1 !== index && <Divider m={0} />} */}
          </Fragment>
        ))}
      </VStack>
    </Container>
  );
};

  // return (
  //   <div>
  //     <h1>Saved Events</h1>
      
  //     {
  //       savedEvents.map(e => (
  //         <div key={e.id}>
  //           <h1>{e.artist}</h1>
  //         </div>
  //       ))
  //     }
  //   </div>
  // );
// };


export default UserEvents;