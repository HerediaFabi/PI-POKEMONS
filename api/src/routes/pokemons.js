const { Router } = require("express");
const { getAll, getPokemon } = require("../controllers/pokemons");
const { Pokemon, Type } = require("../db");

const pokemonRouter = Router();

pokemonRouter.get("/", async (req, res) => {
  const { name } = req.query;
  const result = name ? await getPokemon("name", name) : await getAll();
  res.status(200).json(result);
});

pokemonRouter.get("/:id", async (req, res) => {
  const result = await getPokemon("id", req.params.id);
  res.status(200).json(result);
});

pokemonRouter.post("/", async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, types } = req.body;
  const data = { name, hp, attack, defense, speed, height, weight };
  let newPokemon = await Pokemon.create(data);

  // let typesToAdd = [];
  // types.map(async (t) => {
  //   typesToAdd = await Type.findAll({
  //     where: { name: t },
  //   });
  // });

  console.log(types);
  // console.log(typesToAdd);
  newPokemon.addTypes(types);

  res.status(200).json(newPokemon);
});

module.exports = pokemonRouter;
