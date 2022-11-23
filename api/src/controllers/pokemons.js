const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getAll = async () => {
  try {
    const info = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const info2 = await axios.get(info.data.next);

    const mergeResults = [...info.data.results, ...info2.data.results]; //? TRAER 40 POKEMONES

    const arrayPromise = mergeResults?.map(async (element) => {
      return await axios.get(element.url);
    });

    const promiseData = await axios.all(arrayPromise);
    console.log("a");
    var APIPokemons = promiseData?.map((element) => {
      return {
        id: element.data.id,
        name: element.data.name,
        image: element.data.sprites.other["official-artwork"].front_default,
        attack: element.data.stats.find((el) => el.stat.name === "attack")
          .base_stat,
        types: element.data.types.map((element) => element.type.name),
      };
    });

    // let APIPokemons = [];

    // for (let i = 0; i < arrayPromise.length; i++) {
    //   let infoPokemon = await arrayPromise[i];
    //   pokemon = {
    //     id: infoPokemon.data.id,
    //     name: infoPokemon.data.name,
    //     image: infoPokemon.data.sprites.other["official-artwork"].front_default,
    //     attack: infoPokemon.data.stats.find((el) => el.stat.name === "attack")
    //       .base_stat,
    //     types: infoPokemon.data.types.map((element) => element.type.name),
    //   };
    //   APIPokemons.push(pokemon);
    //   console.log(pokemons.length);
    // }

    const dbPokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    return [...APIPokemons, ...dbPokemons];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getPokemonById = async (id) => {
  try {
  } catch (error) {}
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

  console.log({ image });
  const data = {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image: image
      ? image
      : "https://cdn-icons-png.flaticon.com/512/189/189665.png",
  };
  let newPokemon = await Pokemon.create(data);

  types ? newPokemon.addTypes(types) : newPokemon.addTypes(19);
};

const deletePokemon = async (id) => {
  const dbPokemon = await Pokemon.findByPk(id, {
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  console.log(dbPokemon.length);

  if (Object.keys(dbPokemon).length === 0) await dbPokemon.destroy();

  return;
};

module.exports = {
  getAll,
  getPokemonById,
  getPokemonByName,
  createPokemon,
  deletePokemon,
};
