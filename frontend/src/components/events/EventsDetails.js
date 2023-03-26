import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { eventDate, getTime, getAddress, addressToMap, randomImgURL } from '../../utils/utils';
import UserContext from '../user/UserContext';
import ConcertsApi from '../../api/api';
import { GrMapLocation, GrCalendar, GrPhone, GrOrganization } from 'react-icons/gr';
import { ExternalLinkIcon } from '@chakra-ui/icons';
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
  AbsoluteCenter,
  Spinner
} from '@chakra-ui/react';


const Feature = ({ heading, icon, text1, text2 }) => {
  return (
    <GridItem textAlign={'center'}>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {icon} {heading}
      </chakra.h3>

      <VStack fontSize={'14px'}>
        <Box>{text1}</Box>
        <Box>{text2}</Box>
      </VStack>

    </GridItem>
  );
};

const EventsDetails = () => {
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
      <Box position='relative' minHeight='100vh'>
        <AbsoluteCenter p='4' axis='both'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='pink.500'
            size='xl'
          />
        </AbsoluteCenter>
      </Box>
    );
  };
  
  return (
    <Box as={Container} maxW="7xl" mt={20} p={4}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems="center" spacing="20px" mt={5}>
            <chakra.h2 fontSize="3xl" fontWeight="700" mt={'20px'}>
              {event.Performing_Artist}
            </chakra.h2>

              <Button 
                colorScheme="blue" 
                size="md"
                type="button"
                onClick={handleSaveBtn}
              >
                {saved ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>

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
      <Divider mt={12} mb={12} />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={{ base: '8', sm: '12', md: '16' }}
      >
        <Feature
          heading={'Date-Time'}
          icon={<Icon as={GrCalendar} />}
          text1={eventData.event_date}
          text2={`${eventData.start_time} - ${eventData.end_time}`}
        />
        <Feature
          heading={'Location'}
          icon={<Icon as={GrMapLocation} />}
          text1={eventData.location}
          text2={
            <Link href={addressMap} isExternal>
              {eventData.address} <ExternalLinkIcon mx='2px' />
            </Link>
          }
        />
        <Feature
          heading={'Contact'}
          icon={<Icon as={GrPhone} />}
          text1={eventData.contact}
          text2={eventData.contact_info}
        />
        <Feature
          heading={'Organization'}
          icon={<Icon as={GrOrganization} />}
          text1={`Dept. of ${eventData.organization}`}
          text2={`in District ${eventData.district}`}
        />
      </Grid>
    </Box>
  );
};

export default EventsDetails;