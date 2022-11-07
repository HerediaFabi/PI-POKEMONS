const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getAll = async () => {
  const info = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const info2 = await axios.get(info.data.next);

  const mergeResults = [...info.data.results, ...info2.data.results]; //? TRAER 40 POKEMONES

  let pokemons = [];
  for (let i = 0; i < mergeResults.length; i++) {
    let infoPokemon = await axios.get(mergeResults[i].url);
    let types = [];
    for (const type of infoPokemon.data.types) {
      types.push(type["type"].name);
    }

    pokemons.push({
      name: infoPokemon.data.name,
      image: infoPokemon.data.sprites.other["official-artwork"].front_default,
      types,
    });
  }

  const dbPokemons = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return [...pokemons, ...dbPokemons]; //! Por qué una copia?
};

const getPokemon = async (filter, value) => {
  if (filter !== "id" || (filter === "id" && isNaN(value))) {
    const dbPokemon = await Pokemon.findOne({ where: { [filter]: value } });
    if (dbPokemon) return dbPokemon;
  }

  const apiPokemon = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/" + value
  );

  let pokemon = {};

  if (filter === "id") {
    pokemon = {
      id: apiPokemon.data.id,
      name: apiPokemon.data.name,
      image: apiPokemon.data.sprites.other["official-artwork"].front_default,
      hp: apiPokemon.data.stats.find((el) => el.stat.name === "hp").base_stat,
      attack: apiPokemon.data.stats.find((el) => el.stat.name === "attack")
        .base_stat,
      defense: apiPokemon.data.stats.find((el) => el.stat.name === "defense")
        .base_stat,
      speed: apiPokemon.data.stats.find((el) => el.stat.name === "speed")
        .base_stat,
      height: apiPokemon.data.height,
      weight: apiPokemon.data.weight,
      types: apiPokemon.data.types.map((el) => el.type.name),
    };
  } else {
    pokemon = {
      name: apiPokemon.data.name,
      image: apiPokemon.data.sprites.other["official-artwork"].front_default,
      types: apiPokemon.data.types.map((el) => el.type.name),
    };
  } //*Else en caso de error
  return pokemon;
};

module.exports = {
  getAll,
  getPokemon,
};
