import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="leftLinks">
        <Link to="/">
          <img
            src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/512/external-pikachu-video-games-those-icons-lineal-color-those-icons.png"
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
