import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
const App = () => {
  return (
    <div className="container app-container">
      <Router>
        <div className="side-bar">
          <Navbar />
        </div>
        <Routes>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
