const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getAll = async () => {
  try {
    const info = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const info2 = await axios.get(info.data.next);

    const dbPokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const mergeResults = [...info.data.results, ...info2.data.results]; //? TRAER 40 POKEMONES

    // let pokemons = [];
    // console.log(pokemons);

    const arrayPromise = await info.data.results.map(async (element) => {
      return await axios.get(element.url); //!whats
    });
    console.log(arrayPromise);
    const promiseData = await Promise.all(arrayPromise);
    console.log(promiseData);
    const pokeInfo = promiseData?.map((element) => element.data);
    const pokemons = pokeInfo?.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image: element.sprites.other["official-artwork"].front_default,
        types: element.types.map((element) => element.type.name),
      };
    });

    // for (let i = 0; i < 5; i++) {
    // let promises = await axios.get(mergeResults[i].url);
    // let types = [];
    // for (const type of infoPokemon.data.types) {
    //     types.push(type["type"].name);
    //   }
    //   pokemons.push({
    //       id: infoPokemon.data.id,
    //       name: infoPokemon.data.name,
    //       image: infoPokemon.data.sprites.other["official-artwork"].front_default,
    //       types,
    //     });
    //     console.log(pokemons.length);
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
  const dbPokemons = await Pokemon.findAll();
  const coincidence = await dbPokemons.find(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
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

  // return {id: coincidence.dataValues.id, name: coincidence.dataValues.name, image: coincidence.dataValues.image, types:};

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

module.exports = {
  getAll,
  getPokemonById,
  getPokemonByName,
};
