const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getAll = async () => {
  try {
    const info = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const info2 = await axios.get(info.data.next);

    const mergeResults = [...info.data.results, ...info2.data.results]; //? TRAER 40 POKEMONES

    const arrayPromise = await info.data.results.map(async (element) => {
      return await axios.get(element.url); //!whats
    });
    const promiseData = await Promise.all(arrayPromise);
    const pokeInfo = promiseData?.map((element) => element.data);
    const pokemons = pokeInfo?.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image: element.sprites.other["official-artwork"].front_default,
        types: element.types.map((element) => element.type.name),
      };
    });

    const dbPokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    // let pokemons = [];

    // for (let i = 0; i < 5; i++) {
    //   // let infoPokemon = await axios.get(urls[i]);
    //   // console.log(infoPokemon);
    //   // let types = [];
    //   // for (const type of infoPokemon.data.types) {
    //   //   console.log(type["type"].name);
    //   // }
    //   // console.log({
    //   //   id: infoPokemon.data.id,
    //   //   name: infoPokemon.data.name,
    //   //   image: infoPokemon.data.sprites.other["official-artwork"].front_default,
    //   //   types,
    //   // });
    //   // console.log(pokemons.length);
    // }
    return [...pokemons, ...dbPokemons];
  } catch (error) {
    return error.message;
  } //! Por qué una copia?
};

const getPokemonById = async (id) => {
  if (isNaN(id)) {
    const dbPokemon = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (dbPokemon) return dbPokemon;
  }

  const apiPokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);

  const pokemon = {
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

  return pokemon;
};

const getPokemonByName = async (name) => {
  name = name.toLowerCase();
  const dbPokemons = await Pokemon.findAll();
  const coincidence = await dbPokemons.find(
    (pokemon) => pokemon.name.toLowerCase() === name
  );

  let dbPokemon;
  if (coincidence) {
    dbPokemon = await Pokemon.findByPk(coincidence.dataValues.id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    console.log(dbPokemon);
    return [dbPokemon];
  }

  const apiPokemon = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/" + name
  );

  console.log(apiPokemon);

  const pokemon = {
    id: apiPokemon.data.id,
    name: apiPokemon.data.name,
    image: apiPokemon.data.sprites.other["official-artwork"].front_default,
    types: apiPokemon.data.types.map((el) => el.type.name),
  };

  return [pokemon];
};

const createPokemon = async (body) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    body;
  const data = {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
  };
  let newPokemon = await Pokemon.create(data);

  types ? newPokemon.addTypes(types) : newPokemon.addTypes(19);
};

module.exports = {
  getAll,
  getPokemonById,
  getPokemonByName,
  createPokemon,
};
