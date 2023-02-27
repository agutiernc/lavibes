import React, { useState, useEffect } from 'react';
import ConcertsApi from '../../api/api';
import { Box, SimpleGrid } from '@chakra-ui/react';

import EventCard from './EventCard';

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsList = async () => {
      let events = await ConcertsApi.getAllEvents()

      setEvents(events)
    }

    eventsList()
  }, []);

  if (!events) return null;

  const eventsBox = events.map(e => (
    <Box bg='' height='315px' key={e.ObjectId}>
      <EventCard event={e} />
    </Box>
  ))

  return (
    <div>
      <SimpleGrid minChildWidth='170px' spacing='25px'>
        {eventsBox}
      </SimpleGrid>
    </div>
  )
};

export default EventsList;

// make a grid of 4 columns for cards
// do carousel to show cards for the specified month
//  -- make a function for that
// Also, display cards for current month