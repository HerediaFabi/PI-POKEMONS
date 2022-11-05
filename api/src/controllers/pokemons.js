const axios = require("axios");

const getAllPokemons = async () => {
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
  return pokemons;
};
// pokemonRouter.get("/", (req, res) => {
//     const { name } = req.query;
//     res.status(200).send(name ? "GET pokemons " + name : "GET all pokemons");
//   });

//   pokemonRouter.get("/:id", (req, res) => {
//     res.status(200).send("GET pokemon " + req.params.id);
//   });

//   pokemonRouter.post("/", (req, res) => {
//     res.status(200).send("POST pokemon");
//   });

module.exports = {
  getAllPokemons,
  //   getPokemonsByName,
  //   getPokemonById,
  //   postPokemon,
};
