import React from "react";
import styles from "./Page404.module.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Page404 = (props) => {
  return (
    <>
      <Navbar />
      <div className={styles.page404}>
        <h1>404 page not found :&#40;</h1>
        <Link to={`/home`} className={styles.button}>
          <span>Ir al home</span>
        </Link>
      </div>
    </>
  );
};

export default Page404;
