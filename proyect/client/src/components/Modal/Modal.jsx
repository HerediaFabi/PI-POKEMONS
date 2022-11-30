import React from "react";
import styles from "./Modal.module.css";
import { toggleModal } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Modal = ({
  status,
  message,
  btnOK,
  btnOKAction,
  btnYes,
  btnYesAction,
  btnNo,
  btnNoAction,
}) => {
  const dispatch = useDispatch();
  return (
    <div hidden={!status} className={styles.modal}>
      <div className={styles.section}>
        <p className={styles.message}>{message}</p>
      </div>
      <div className={styles.section}>
        <input
          className={`${styles.btnOK} ${styles.button}`}
          hidden={!btnOK || btnNo || btnYes}
          onClick={() => btnOKAction()}
          type="button"
          value="OK"
        />
        <input
          className={`${styles.btnNo} ${styles.button}`}
          hidden={!btnNo}
          onClick={() => btnNoAction()}
          type="button"
          value="No"
        />
        <input
          className={`${styles.btnYes} ${styles.button}`}
          hidden={!btnYes}
          onClick={() => btnYesAction()}
          type="button"
          value="Yes"
        />
      </div>
    </div>
  );
};

export default Modal;
