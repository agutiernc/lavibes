import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { eventDate, getTime, getAddress, addressToMap, randomImgURL } from '../../utils/utils';
import UserContext from '../user/UserContext';
import LoadingSpinner from '../common/LoadingSpinner';
import Feature from './Feature';
import ConcertsApi from '../../api/api';
import { FaPhoneAlt,
  FaRegCalendarAlt,
  FaRegBuilding,
  FaMapMarkedAlt,
  FaExternalLinkAlt,
  FaRegArrowAltCircleLeft
} from 'react-icons/fa'
import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  Icon,
  Image,
  Link,
  useColorModeValue,
  Text,
  HStack
} from '@chakra-ui/react';


const EventsDetails = () => {
  const externalLinkColor = useColorModeValue('pink.700', 'pink.400')
  const { id } = useParams();
  const { hasSavedEvent, saveUserEvent, currentUser, removeUserEvent } = useContext(UserContext);
  const [event, setEvent] = useState(null);
  const [saved, setSaved] = useState(false);
  const imgURL = useMemo(() => {
    return randomImgURL();
  }, []);

  // get event info
  useEffect(() => {
    const eventInfo = async () => {
      const event = await ConcertsApi.getAllEvents(id);

      setEvent(event);
    };

    eventInfo();
  }, [id]);


  // if event exists, add data to object
  const eventData = useMemo(() => {
    if (event) {
      return {
        id: event.ObjectId,
        artist: event.Performing_Artist,
        organization: event.Presenting_Organization.slice(14),
        event_date: eventDate(event.Concert_Date),
        start_time: getTime(event.Start_Time),
        end_time: getTime(event.End_Time),
        location: event.Concert_Location,
        address: getAddress(event.Location),
        contact: event.Contact,
        contact_info: event.Contact_Info,
        district: event.Supervisor_District,
        year: event.Year
      };
    };

    return null;
  }, [event]);

  // verify event data, curr user info, and if user has event saved
  useEffect(() => {
    if (eventData && currentUser) {
      setSaved(hasSavedEvent(eventData.id));
    };
  }, [eventData, currentUser, hasSavedEvent]);


  // convert address to google maps URL
  const addressMap = eventData ? addressToMap(eventData.address) : null;

  const handleSaveBtn = () => {
    try {
      if (saved) {
        removeUserEvent(currentUser.username, eventData.id);
        setSaved(false);
      } else {
        saveUserEvent(currentUser.username, eventData.id, eventData);
        setSaved(true);
      }
    } catch (err) {
      console.log('Unable to save event');
    }
  };

  // show spinner if components are still loading
  if (!event) {
    return (
      <LoadingSpinner />
    );
  };
  
  return (
    <Box as={Container} maxW="7xl" pt={[1, 20]} px={4} minH={'90vh'} mb={5}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}
        mt={19}
      >
        <GridItem colSpan={1}>
          <VStack alignItems="center" spacing="20px" mt={5}>
            <chakra.h2 fontSize="3xl" fontWeight="700" mt={'20px'} color={'pink.700'}>
              {event.Performing_Artist}
            </chakra.h2>

            { currentUser ? (
              <Button 
                bg={"pink.600"}
                color={'white'}
                _hover={{ bg: 'pink.500' }}
                size="md"
                type="button"
                onClick={handleSaveBtn}
              >
                {saved ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
              ) : (
              <Box>
                <Text>
                  <Link href="/login" fontWeight="bold" color="pink.700">
                    Login
                  </Link> or {" "}
                  <Link href="/signup" fontWeight="bold" color="pink.700">
                    Sign up
                    </Link> for an account to save this event.
                </Text>
              </Box>
              )

            }
              
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p>
              <Image src={imgURL} boxSize={'90%'} borderRadius={'10px'} boxShadow={'2xl'}/>
            </chakra.p>
          </Flex>
        </GridItem>
      </Grid>
      <Divider py={5} />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={{ base: '8', sm: '12', md: '16' }}
        pt={10}
      >
        <Feature
          heading={'Date-Time'}
          icon={FaRegCalendarAlt}
          text1={eventData.event_date}
          text2={`${eventData.start_time} - ${eventData.end_time}`}
        />
        <Feature
          heading={'Location'}
          icon={FaMapMarkedAlt}
          text1={eventData.location}
          text2={
            <Link href={addressMap} isExternal>
              {eventData.address} <Icon as={FaExternalLinkAlt} mx='2px' color={externalLinkColor} boxSize={4} />
            </Link>
          }
        />
        <Feature
          heading={'Contact'}
          icon={FaPhoneAlt}
          text1={eventData.contact}
          text2={eventData.contact_info}
        />
        <Feature
          heading={'Organization'}
          icon={FaRegBuilding}
          text1={`Dept. of ${eventData.organization}`}
          text2={`in District ${eventData.district}`}
        />
      </Grid>
        
      <Link href="/events">
        <HStack alignItems={'center'} justifyContent={'center'} mt={14} pb={[24, 5]}>

          <Icon as={FaRegArrowAltCircleLeft} color={'pink.700'} boxSize={5} />
          <Text textAlign={'center'} fontSize={'1.2rem'} color={'pink.700'}>Back To Events</Text>
        </HStack>
      </Link>
    </Box>
  );
};

export default EventsDetails;