import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div>
        <img src="./water.svg" alt="svg" />
      </div>

      <NavLink to="/home">HOME</NavLink>
      <NavLink to="/createPokemon">CREATE POKEMON</NavLink>
      <NavLink to="/about">ABOUT</NavLink>
    </div>
  );
};

export default Navbar;
