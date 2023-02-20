import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Main from '../components/homepage/Main';
import SignupForm from '../components/user/SignupForm';

const ComponentRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default ComponentRoutes;