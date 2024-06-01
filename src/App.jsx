import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div className="container app-container">
      <Router>
        <div className="side-bar">
          <Navbar />
        </div>
        <div className="main-page">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
