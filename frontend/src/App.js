import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "./routes-nav/NavBar";
import ComponentRoutes from "./routes-nav/ComponentRoutes";

const App = () => {

  return (
    <Router>
      <NavBar />

      <ComponentRoutes />
    </Router>
  )
}

export default App;
