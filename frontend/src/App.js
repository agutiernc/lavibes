import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { decodeToken } from 'react-jwt';
import UserContext from './components/user/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import ConcertsApi from './api/api';
import { Container, useColorMode } from '@chakra-ui/react';

import NavBar from "./routes-nav/NavBar";
import Footer from "./routes-nav/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ComponentRoutes from "./routes-nav/ComponentRoutes";

export const TOKEN_STORAGE_ID = "concerts-token";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [eventIds, setEventIds] = useState(new Set([]));
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ msg: '', type: ''});
  const { colorMode, toggleColorMode } = useColorMode();

  // load user info
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          let { username } = decodeToken(token);

          ConcertsApi.token = token;

          let currentUser = await ConcertsApi.getCurrentUser(username);

          setCurrentUser(currentUser);
          setEventIds(new Set(currentUser.events.map(event => event.id)));
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
      let token = await ConcertsApi.signup(data);

      setToken(token);

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
    localStorage.clear();
    setToken(null);
    setCurrentUser(null);
  }

  const hasSavedEvent = (id) => eventIds.has(id);

  const saveUserEvent = async (username, eventId, eventObj) => {
    try {
      // If the event is already saved, remove it
      if (hasSavedEvent(eventId)) {
        await ConcertsApi.deleteSavedEvent(username, eventId);

        setEventIds(prevIds => new Set(prevIds.filter(id => id !== eventId)));
      } else {
        // Otherwise, save the event
        await ConcertsApi.saveEvent(username, eventId, eventObj);

        setEventIds(prevIds => new Set([...prevIds, eventId]));
      }
    } catch (err) {
      console.error("App saveUserEvent: problem saving", err);
    }
  };
  
  const removeUserEvent = async (username, id) => {
    await ConcertsApi.deleteSavedEvent(username, id);

    const updatedEventIds = new Set([...eventIds].filter(eventId => eventId !== id));
    
    setEventIds(updatedEventIds);
  }
  
  // show spinner if components are still loading
  if (!loading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasSavedEvent, saveUserEvent, removeUserEvent, message, setMessage }}>
        <NavBar logout={logout} colorMode={colorMode} toggleColorMode={toggleColorMode} />

        <Container maxW="100%" height="auto" bg={colorMode === "light" ? "#fae6f1" : "gray.900"}>
          <Container maxW={'90%'} minHeight={'100%'} bg={colorMode === "light" ? "#fff" : "gray.800"}>
            <ComponentRoutes signup={signup} login={login} />
          </Container>
        </Container>

        <Footer />
      </UserContext.Provider>
    </Router>
  )
}

export default App;
