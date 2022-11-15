import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="leftLinks">
        <Link to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/743/743977.png"
            alt=""
          />
        </Link>

        <NavLink to="/home" className="navlink">
          HOME
        </NavLink>
      </div>
      <div className="rightLinks">
        <NavLink to="/createPokemon" className="navlink">
          CREATE POKEMON
        </NavLink>
        <NavLink to="/about" className="navlink">
          ABOUT
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
