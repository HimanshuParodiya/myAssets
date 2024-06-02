import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container nav-container">
      <h1 className="nav-heading">MyAssets</h1>
      <div className="hamburger-icon">
        <span className="hamburger-icon-bar"></span>
        <span className="hamburger-icon-bar"></span>
        <span className="hamburger-icon-bar"></span>
      </div>
      <div className="nav-menus">
        <ul className="nav-menu-ul">
          <li className="nav-menu-li">
            <Link className="" to={"/"}>
              Dashboard
            </Link>
          </li>
          <li className="nav-menu-li">
            <Link className="" to={"/assets"}>
              Assets
            </Link>
          </li>
          <li className="nav-menu-li">
            <Link className="" to={"/maintenance"}>
              Maintenance
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
