export const dbPokemons = (array) => {
  const filteredArray = array.filter((pokemon) =>
    pokemon.hasOwnProperty("createdAt")
  );
  return filteredArray.length > 0
    ? filteredArray
    : [{ error: "There are no pokemons in the database", code: 404 }];
};

export const apiPokemons = (array) => {
  return array.filter((pokemon) => !pokemon.hasOwnProperty("createdAt"));
};

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

export const attackMin = (array) => {
  return array.sort((a, b) => {
    return a.attack - b.attack;
  });
};

export const attackMax = (array) =>
  array
    .sort((a, b) => {
      return a.attack - b.attack;
    })
    .reverse();
