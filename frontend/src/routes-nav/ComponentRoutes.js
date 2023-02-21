import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Main from '../components/homepage/Main';
import SignupForm from '../components/user/SignupForm';
import LoginForm from '../components/user/LoginForm';
import EventsList from '../components/events/EventsList';
// import UserEvents from '../components/user/UserEvents';

const ComponentRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/events' element={<EventsList />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default ComponentRoutes;