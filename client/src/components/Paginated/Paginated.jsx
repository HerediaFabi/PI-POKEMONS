import React from "react";
import styles from "./Paginated.module.css";

const Paginated = ({ paginated, array, name, currentPage }) => {
  let pages = [];
  const pokemonsPerPage = 12;
  let contador = 1;
  for (let i = 0; i < array.length; i++) {
    if (contador === 1) {
      if (pages.length === 0) pages.push(1);
      else pages.push(pages.at(-1) + 1);
    }
    if (contador === pokemonsPerPage) contador = 0;
    contador++;
  }

  return (
    <div className={styles.paginated}>
      <div className={styles.page}>
        <input
          onChange={() => {
            paginated(currentPage - 1);
          }}
          type="radio"
          name={name}
          id="previous"
          disabled={currentPage === 1}
          checked={false}
          className={styles.radio}
        />
        <label htmlFor="previous">&lt;</label>
      </div>
      {pages.map((page) => {
        return (
          <div key={page} className={styles.page}>
            <input
              onChange={() => {
                paginated(page);
              }}
              type="radio"
              name={name}
              id={page}
              checked={page === currentPage}
              className={styles.radio}
            />
            <label htmlFor={page}>{page}</label>
          </div>
        );
      })}
      <div className={styles.page}>
        <input
          onChange={() => {
            paginated(currentPage + 1);
          }}
          type="radio"
          name={name}
          id="next"
          disabled={currentPage === pages.length}
          checked={false}
          className={styles.radio}
        />
        <label htmlFor="next">&gt;</label>
      </div>
    </div>
  );

  //
};
export default Paginated;
