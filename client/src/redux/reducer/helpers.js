export const alphabeticAsc = (array) =>
  array.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

export const alphabeticDesc = (array) =>
  array.sort((a, b) => {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  });

export const indistinctOrder = (array) =>
  array.sort((a, b) => {
    if (typeof a !== typeof b) return -1;
    if (a.hasOwnProperty("createdAt"))
      return new Date(a.createdAt) - new Date(b.createdAt);
    return a.id - b.id;
  });

export const dbPokemons = (array) => {
  return array.filter((pokemon) => pokemon.hasOwnProperty("createdAt"));
};

export const apiPokemons = (array) => {
  return array.filter((pokemon) => !pokemon.hasOwnProperty("createdAt"));
};
