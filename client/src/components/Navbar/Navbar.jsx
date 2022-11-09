import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <h1>COMPONENTE Navbar</h1>
      <NavLink to="/home">HOME</NavLink>
      <NavLink to="/createPokemon">CREATE POKEMON</NavLink>
      <NavLink to="/about">ABOUT</NavLink>
    </div>
  );
};

export default Navbar;
