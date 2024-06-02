import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Asset from "./components/Asset";
import AssetDetails from "./components/AssetDetails";

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
            <Route path="/assets" element={<Asset />} />
            <Route path="/assets/:id" element={<AssetDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
