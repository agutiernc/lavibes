import React, { useState, useEffect } from 'react';
import ConcertsApi from '../../api/api';
import { Box, SimpleGrid } from '@chakra-ui/react';

import EventCard from './EventCard';

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsList = async () => {
      let events = await ConcertsApi.getAllEvents();

      setEvents(events)
    }

    eventsList()
  }, []);

  // const filterByYear = events.filter(x => x["Concert_Date"].startsWith("2021"))
  // console.log(filterByYear)
  
  // console.log(events)

  // make function to fill cards with each event from JSON file
  // also filter out JSON file with only 2021/22 events
  return (
    <div>
      <SimpleGrid minChildWidth='170px' spacing='10px'>
        <Box bg='' height='288px'>
          <EventCard />
        </Box>
        <Box bg='' height='288px'>
          <EventCard />
        </Box>
        <Box bg='' height='288px'>
          <EventCard />
        </Box>
        <Box bg='' height='288px'>
          <EventCard />
        </Box>
      </SimpleGrid>
    </div>
  )
};

export default EventsList;

// make a grid of 4 columns for cards