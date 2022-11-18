import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.leftLinks}>
        <Link to="/">
          <img
            src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/512/external-pikachu-video-games-those-icons-lineal-color-those-icons.png"
            alt=""
          />
        </Link>

        <NavLink to="/home" className={styles.navlink}>
          HOME
        </NavLink>
      </div>
      <div className={styles.rightLinks}>
        <NavLink to="/createPokemon" className={styles.navlink}>
          CREATE POKEMON
        </NavLink>
        <NavLink to="/about" className={styles.navlink}>
          ABOUT
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
