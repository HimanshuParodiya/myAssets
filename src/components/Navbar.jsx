import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`nav-container ${isOpen ? "open" : ""}`}>
      <div className="hamburger-icon" onClick={handleHamburger}>
        <span className="hamburger-icon-bar"></span>
        <span className="hamburger-icon-bar"></span>
        <span className="hamburger-icon-bar"></span>
      </div>
      <h1 className="nav-heading">MyAssets</h1>
      <div className={`nav-menus ${isOpen ? "show" : ""}`}>
        <ul className="nav-menu-ul">
          <li className="nav-menu-li">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="nav-menu-li">
            <Link to="/assets">Assets</Link>
          </li>
          <li className="nav-menu-li">
            <Link to="/maintenance">Maintenance</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
