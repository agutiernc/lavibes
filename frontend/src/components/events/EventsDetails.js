import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { eventDate, getTime, getAddress, addressToMap } from '../../utils/utils';
import ConcertsApi from '../../api/api';
import { GrMapLocation, GrCalendar, GrPhone, GrOrganization } from 'react-icons/gr';
import { ExternalLinkIcon } from '@chakra-ui/icons'
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
  Link
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
  const [event, setEvent] = useState(null);
 
  // get event info
  useEffect(() => {
    const eventInfo = async () => {
      const event = await ConcertsApi.getAllEvents(id);

      setEvent(event);
    }

    eventInfo();
  }, [id]);

  if (!event) return null;

  const address = getAddress(event.Location);
  const addressMap = addressToMap(address)
  
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
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h2 fontSize="3xl" fontWeight="700" mt={'20px'}>
              {event.Performing_Artist}
            </chakra.h2>
            <Button colorScheme="green" size="md">
              Call To Action
            </Button>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p>
              <Image src={'/images/palms.jpg'} boxSize={'90%'} borderRadius={'10px'} boxShadow={'2xl'}/>
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
          text1={eventDate(event.Concert_Date)}
          text2={`${getTime(event.Start_Time)} - ${getTime(event.End_Time)}`}
        />
        <Feature
          heading={'Location'}
          icon={<Icon as={GrMapLocation} />}
          text1={event.Concert_Location}
          text2={
            <Link href={addressMap} isExternal>
              {address} <ExternalLinkIcon mx='2px' />
            </Link>
          }
        />
        <Feature
          heading={'Contact'}
          icon={<Icon as={GrPhone} />}
          text1={event.Contact}
          text2={event.Contact_Info}
        />
        <Feature
          heading={'Organization'}
          icon={<Icon as={GrOrganization} />}
          text1={`Dept. of ${event.Presenting_Organization.slice(14)}`}
          text2={`in District ${event.Supervisor_District}`}
        />
      </Grid>
    </Box>
  );
}

export default EventsDetails;

/**
 * Needs:
 * - Button to save event for user
 * - Image that Event Card originally has
 * - font colors
 */