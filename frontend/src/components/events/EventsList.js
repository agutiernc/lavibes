import React, { useState, useEffect } from 'react';
import ConcertsApi from '../../api/api';
import { Box, SimpleGrid } from '@chakra-ui/react';

import EventCard from './EventCard';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [eventMap, setEventMap] = useState(new Map())

  // get all events data
  useEffect(() => {
    const eventsList = async () => {
      let events = await ConcertsApi.getAllEvents();

      setEvents(events)
    }

    eventsList()
  }, []);

  if (!events) return null;

  // Map events by months
  const mapEvents = (month, eventObj) => {
    const eventSet = eventMap.get(month)

    if (eventMap.has(month) && !eventSet.has(eventObj)) {
      eventSet.add(eventObj)
    } else {
      const newSet = new Set()

      newSet.add(eventObj)
      eventMap.set(month, newSet)
    }

    setEventMap(eventMap)
  }

  if (!eventMap) return null;

  const eventsBox = events.map(e => (
    <Box bg='' height='325px' key={e.ObjectId}>
      <EventCard event={e} mapEvents={mapEvents} />
    </Box>
  ))

  // console.log('# of events: ', events.length)
  // console.log('MAP: ', eventMap)

  return (
    <div>
      <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacing='18px'>
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