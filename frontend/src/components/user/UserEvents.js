import React, { useState, useContext } from 'react';
import UserContext from './UserContext';

const UserEvents = () => {
  const { currentUser } = useContext(UserContext);
  const [savedEvents, setSavedEvents] = useState(currentUser.events);
  console.log(savedEvents)

  // const handleDeleteBtn = (eventId) => {
  //   // remove the event from savedEvents array
  //   const newSavedEvents = savedEvents.filter(event => event.id !== eventId);

  //   // update state with the new savedEvents array
  //   setSavedEvents(newSavedEvents);
  // };

  return (
    <div>
      <h1>Saved Events</h1>
      
      {
        savedEvents.map(e => (
          <div key={e.id}>
            <h1>{e.artist}</h1>
          </div>
        ))
      }
    </div>
  );
};


export default UserEvents;