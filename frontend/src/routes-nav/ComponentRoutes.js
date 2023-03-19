import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Main from '../components/homepage/Main';
import SignupForm from '../components/user/SignupForm';
import LoginForm from '../components/user/LoginForm';
import ProfileForm from '../components/user/ProfileForm';
import EventsList from '../components/events/EventsList';
import EventsDetails from '../components/events/EventsDetails';
import UserEvents from '../components/user/UserEvents';

const ComponentRoutes = ({ login, signup }) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/events' element={<EventsList />} />
        <Route path='/events/:id' element={<EventsDetails />} />
        <Route path='/user/:username/events' element={<UserEvents />} />
        <Route path='/user/:username/settings' element={<ProfileForm />} />
        <Route path='/signup' element={<SignupForm signup={signup} />} />
        <Route path='/login' element={<LoginForm login={login} />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default ComponentRoutes;