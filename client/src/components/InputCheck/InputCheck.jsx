import React from "react";
import styles from "./InputCheck.module.css";

const InputCheck = ({ name, element, onChange, capitalize, inputField }) => {
  return (
    <div>
      {console.log(inputField)}
      <input
        className={styles.check}
        onChange={onChange}
        type="checkbox"
        name={name}
        id={element.id}
        value={element.id}
        checked={
          !inputField ? false : inputField.includes(element.id.toString())
        }
      />
      <label className={styles.check} htmlFor={element.id}>
        {capitalize(element.name)}
      </label>
    </div>
  );
};

export default InputCheck;
