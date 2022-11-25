const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getAll = async () => {
  const info = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const info2 = await axios.get(info.data.next);

  const mergeResults = [...info.data.results, ...info2.data.results]; //? TRAER 40 POKEMONES

  const arrayPromise = mergeResults?.map((element) => {
    return axios.get(element.url);
  });

  const promiseData = await axios.all(arrayPromise);
  const APIPokemons = promiseData?.map((element) => {
    return {
      id: element.data.id,
      name: element.data.name,
      image: element.data.sprites.other["official-artwork"].front_default,
      attack: element.data.stats.find((el) => el.stat.name === "attack")
        .base_stat,
      types: element.data.types.map((element) => element.type.name),
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

  const allPokemons = [...APIPokemons, ...dbPokemons];
  return allPokemons;
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

  const dbPokemon = await Pokemon.findOne(
    { where: { name: name } },
    {
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    }
  );
  if (dbPokemon) return [dbPokemon];

  const apiPokemon = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/" + name
  );
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

  console.log(image);

  let pokemon = await Pokemon.findAll({ where: { name: name } });

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
  if (Object.keys(pokemon).length > 0)
    throw "The pokemon you are trying to create already exists in the database, please change the name";

  let apiPokemon = null;
  try {
    apiPokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + name);
  } catch (error) {}

  if (apiPokemon)
    throw "The pokemon you are trying to create already exists in the API, please change the name";

  const newPokemon = await Pokemon.create(data);
  types ? newPokemon.addTypes(types) : newPokemon.addTypes(19);
};

const deletePokemon = async (id) => {
  Pokemon.destroy({
    where: {
      id: id,
    },
  });
  return id;
};

const updatePokemon = async (id, data) => {
  const pokemon = await Pokemon.findByPk(id, {
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  await pokemon.set({
    name: data.name,
    image: data.image,
    height: data.height,
    weight: data.weight,
    hp: data.hp,
    attack: data.attack,
    defense: data.defense,
    speed: data.speed,
  });
  await pokemon.setTypes(data.types);
  await pokemon.save();
  return pokemon;
};

module.exports = {
  getAll,
  getPokemonById,
  getPokemonByName,
  createPokemon,
  deletePokemon,
  updatePokemon,
};
