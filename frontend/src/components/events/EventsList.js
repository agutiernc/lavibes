import React, { useState, useEffect, useRef } from 'react';
import ConcertsApi from '../../api/api';
import { register } from 'swiper/element/bundle';
import { Box, SimpleGrid, Heading, Center } from '@chakra-ui/react';
import './EventsList.css';
import EventCard from './EventCard';

register(); // for swiper carousel

const EventsList = () => {
  const swiperElRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [eventsMap, setEventsMap] = useState(new Map());

  // swiper carousel
  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener('progress', (e) => {
      const [swiper, progress] = e.detail;
      // console.log(swiper)
      // console.log(progress);
    });

    swiperElRef.current.addEventListener('slidechange', (e) => {
      console.log('slide changed');
    });
  }, []);

  // get all events data from backend
  useEffect(() => {
    const eventsList = async () => {
      let events = await ConcertsApi.getAllEvents();

      setEvents(events)
    }

    eventsList()
  }, []);

  // Map events by month
  useEffect(() => {
    const mapEvents = (month, eventObj) => {
      setEventsMap(prevMap => {
        const eventSet = prevMap.get(month);

        if (prevMap.has(month) && !eventSet.has(eventObj)) {
          eventSet.add(eventObj);

          return prevMap.set(month, eventSet);
        } else {
          const newSet = new Set();

          newSet.add(eventObj);
          
          return prevMap.set(month, newSet);
        }
      });
    }

    const mapEventsData = async () => {
      await Promise.all(
        events.map(e => {
          const getMonth = new Date(e.Concert_Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          
          return mapEvents(getMonth.slice(0, 3), e);
        })
      );
    }

    mapEventsData()
  }, [events]);


  if (!events) return null;
  if (!eventsMap) return null;

  const eventsBox = (month) => {
    const eventSet = eventsMap.get(month);
  
    if (!eventSet) {
      return [];
    }
  
    const sortedEvents = Array.from(eventSet).sort((a, b) => {
      const dateA = new Date(a.Concert_Date);
      const dateB = new Date(b.Concert_Date);

      return dateA - dateB;
    });
  
    return sortedEvents.map(e => (
      <Box height='320px' key={e.ObjectId}>
        <EventCard event={e} />
      </Box>
    ));
  };
  
  // console.log(eventsMap.get('Jul'))
  // console.log('# of events: ', events.length)

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="1"
      navigation="true"
      pagination="true"
      rewind="true"
    >
      <swiper-slide>
        <Center my={8}>
          <Heading size={'xl'}>June</Heading>
        </Center>
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing='15px'>
          {eventsBox('Jun')}
        </SimpleGrid>
      </swiper-slide>

      <swiper-slide>
        <Center my={8}>
          <Heading size={'xl'}>July</Heading>
        </Center>
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing='15px'>
          {eventsBox('Jul')}
        </SimpleGrid>
      </swiper-slide>

      <swiper-slide>
        <Center my={8}>
          <Heading size={'xl'}>August</Heading>
        </Center>
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing='15px'>
          {eventsBox('Aug')}
        </SimpleGrid>
      </swiper-slide>
    </swiper-container>
  )
};

export default EventsList;

// adjust height for each slide
// move pagination under Headings
// move nav arrows to sides of Headings