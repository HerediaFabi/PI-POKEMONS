import React from "react";
import styles from "./Input.module.css";
import ValidationMessage from "../ValidationMessage/ValidationMessage";

const InputBox = ({
  type,
  name,
  onChange,
  value,
  validationMessage,
  capitalize,
}) => {
  return (
    <div className={styles["input-box"]}>
      <input
        value={value}
        type={type}
        name={name}
        required="required"
        onChange={onChange}
      />
      <span className={styles["placeholder"]}>{capitalize(name)}</span>
      {validationMessage && <ValidationMessage message={validationMessage} />}
    </div>
  );
};

export default InputBox;
