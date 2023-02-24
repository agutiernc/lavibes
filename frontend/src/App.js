import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from '@chakra-ui/react';

import NavBar from "./routes-nav/NavBar";
import ComponentRoutes from "./routes-nav/ComponentRoutes";

const App = () => {

  return (
    <Router>
      <NavBar />

      <Container maxW={'90%'} mt={5}>
        <ComponentRoutes />
      </Container>
    </Router>
  )
}

export default App;
