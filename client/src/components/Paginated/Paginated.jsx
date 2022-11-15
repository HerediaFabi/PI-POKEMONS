import React from "react";
import "./Paginated.css";

const Paginated = ({ paginated, array, name, currentPage }) => {
  let pages = [1];
  const pokemonsPerPage = 12;
  let contador = 1;
  for (let i = 0; i < array.length; i++) {
    if (contador === 1) {
      pages.push(pages.at(-1) + 1);
    }
    if (contador === pokemonsPerPage) {
      contador = 0;
    }
    contador++;
  }
  pages.pop();

  return (
    <div className="paginated">
      {pages.map((page) => {
        return (
          <div key={page} className="page">
            <input
              onChange={() => {
                paginated(page);
              }}
              type="radio"
              name={name}
              id={page}
              checked={page === currentPage}
            />
            <label htmlFor={page}>{page}</label>
          </div>
        );
      })}
    </div>
  );

  //
};
export default Paginated;
