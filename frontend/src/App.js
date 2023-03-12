import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { decodeToken } from 'react-jwt';
import UserContext from './components/user/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import ConcertsApi from './api/api';
import { Container } from '@chakra-ui/react';

import NavBar from "./routes-nav/NavBar";
import ComponentRoutes from "./routes-nav/ComponentRoutes";

export const TOKEN_STORAGE_ID = "concerts-token";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ msg: '', type: ''})

  // load user info
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          let { username } = decodeToken(token);

          ConcertsApi.token = token;

          let currentUser = await ConcertsApi.getCurrentUser(username);

          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);

          setCurrentUser(null);
        }
      }

      setLoading(true);
    }

    setLoading(false);
    getCurrentUser();
  }, [token])

  
  const signup = async (data) => {
    try {
      let token = await ConcertsApi.signup(data)

      setToken(token)

      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  const login = async (data) => {
    try {
      let token = await ConcertsApi.login(data);
      
      setToken(token);

      return { success: true }
    } catch (err) {
      return { success: false, err}
    }
  }

  const logout = () => {
    setToken(null)
    setCurrentUser(null)
    // localStorage.removeItem("concerts-token");
  }

  if (!loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser, message, setMessage }}>
        <NavBar logout={logout} />

        <Container maxW={'90%'} mt={0}>
          <ComponentRoutes signup={signup} login={login} />
        </Container>
      </UserContext.Provider>
    </Router>
  )
}

export default App;
