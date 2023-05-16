import React, { useState, useEffect, useCallback } from 'react';
import EventCard from './EventCard';
import ConcertsApi from '../../api/api';

import { Box, Heading, Center, Spinner, AbsoluteCenter, SimpleGrid, Icon } from '@chakra-ui/react';
import useEmblaCarousel from 'embla-carousel-react'
import AutoHeight from 'embla-carousel-auto-height'
import './EventsList.css';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [eventsMap, setEventsMap] = useState(new Map());
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, draggable: true }, [AutoHeight()])

  // embla API for resizing on different media - that's an effect
  useEffect(() => {
    if (emblaApi) {
     emblaApi.reInit();
    }
  }, [emblaApi]);

  // get all events data from backend
  useEffect(() => {
    const eventsList = async () => {
      let events = await ConcertsApi.getAllEvents();

      setEvents(events);
    }

    eventsList();
  }, []);

  // Map events by month
  useEffect(() => {
    const mapEvents = (month, eventObj) => {
      setEventsMap(prevMap => {
        const newMap = new Map(prevMap);
        const eventSet = newMap.get(month);
      
        if (newMap.has(month) && !eventSet.has(eventObj)) {
          eventSet.add(eventObj);
          newMap.set(month, eventSet);
        } else {
          const newSet = new Set();
      
          newSet.add(eventObj);
          newMap.set(month, newSet);
        }
      
        return newMap;
      });
      
    }

    const mapEventsData = async () => {
      await Promise.allSettled(
        events.map(e => {
          const getMonth = new Date(e.Concert_Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          
          return mapEvents(getMonth.slice(0, 3), e);
        })
      );
    }

    mapEventsData()
  }, [events]);

  // prep data for event cards and sort by month
  const eventsBox = events && eventsMap ? (month) => {
    const eventSet = eventsMap.get(month);
  
    if (!eventSet || !eventsMap) {
      return [];
    }
  
    const sortedEvents = Array.from(eventSet).sort((a, b) => {
      const dateA = new Date(a.Concert_Date);
      const dateB = new Date(b.Concert_Date);

      return dateA - dateB;
    });
  
    return sortedEvents.map(e => (
      <Box key={e.ObjectId}>
        <EventCard event={e} />
      </Box>
    ));
  } : null;

  // embla navigation buttons
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // show spinner if still loading
  if (events.length === 0 && eventsMap.size === 0) {
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
  }

  return (
    <Box pb={25}>
      <Box className="embla" height={'auto'}>
        <button className="embla__prev" onClick={scrollPrev} type="button">
          <Icon as={BsChevronDoubleLeft} boxSize={7} color={'pink.700'} />
        </button>
        <button className="embla__next" onClick={scrollNext} type="button">
          <Icon as={BsChevronDoubleRight} boxSize={7} color={'pink.700'} />
        </button>

        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            <div className="embla__slide">
              <Center my={8}>
                <Heading size={'xl'} className="embla__slide-heading" px={3} color={'pink.700'}>
                  June
                </Heading>
              </Center>
              <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing='30px' pb={70}>
                {eventsBox('Jun')}
              </SimpleGrid>
            </div>
            <div className="embla__slide">
              <Center my={8}>
                <Heading size={'xl'} className="embla__slide-heading" px={3} color={'pink.700'}>
                  July
                </Heading>
              </Center>
              <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing='30px' pb={70}>
                {eventsBox('Jul')}
              </SimpleGrid>
            </div>
            <div className="embla__slide">
              <Center my={8}>
                <Heading size={'xl'} className="embla__slide-heading" px={3} color={'pink.700'}>
                  August
                </Heading>
              </Center>
              <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing='30px' pb={70}>
                {eventsBox('Aug')}
              </SimpleGrid>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  )
};

export default EventsList