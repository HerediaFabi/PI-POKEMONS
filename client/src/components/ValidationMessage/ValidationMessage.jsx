import React from "react";
import styles from "./ValidationMessage.module.css";

const ValidationMessage = ({ message }) => {
  return (
    <div className={styles["message-box"]}>
      {message && (
        <span className={styles["validation-message"]}>&middot; {message}</span>
      )}
    </div>
  );
};

export default ValidationMessage;
