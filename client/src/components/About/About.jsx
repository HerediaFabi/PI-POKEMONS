import React from "react";
import styles from "./About.module.css";
import Navbar from "../Navbar/Navbar";

const About = (props) => {
  return (
    <>
      <Navbar />
      <div className={`${styles.about}`}>
        <h1 className={`${styles["center-text"]} ${styles["about-title"]}`}>
          Individual Proyect
        </h1>
        <ul className={`${styles.list}`}>
          <li>
            <span>Theme</span>: Pokemon
          </li>
          <li>
            <span>Cohort</span>: WebFT31-c
          </li>
          <li>
            <span>Student</span>: Heredia, Fabiana Abril
          </li>
          <li>
            <span>Technologies used</span>:
            <ul className={`${styles["inside-list"]}`}>
              <li>
                <span>Frontend</span>: HTML, CSS, React, Redux
              </li>
              <li>
                <span>Backend</span>: Node.js, Express.js
              </li>
              <li>
                <span>Database:</span> Sequelize, Postgre SQL
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default About;
