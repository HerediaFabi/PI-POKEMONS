import React from "react";

const Paginado = ({ paginated, array }) => {
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
    <div className="paginado">
      {pages.map((page) => {
        return (
          <div key={page}>
            <input
              onChange={() => {
                paginated(page);
              }}
              type="radio"
              name="pageNumber"
              id={page}
              defaultChecked={page === 1}
            />
            <label htmlFor={page}>{page}</label>
          </div>
        );
      })}
    </div>
  );

  //
};
export default Paginado;
