import React, { useState, useEffect } from 'react';
import ConcertsApi from '../../api/api';
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
  return (
    <div>
      <EventCard />
    </div>
  )
};

export default EventsList;

// make a grid of 4 columns for cards