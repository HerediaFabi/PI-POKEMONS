import React from "react";
import styles from "./Loader.module.css";

const Loader = (props) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.pokeball}></div>
        <span className={styles.loader}>Loading</span>
      </div>
    </>
  );
};

export default Loader;
