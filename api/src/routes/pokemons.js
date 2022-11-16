const { Router } = require("express");
const {
  getAll,
  getPokemonById,
  getPokemonByName,
} = require("../controllers/pokemons");
const { Pokemon } = require("../db");

const pokemonRouter = Router();

pokemonRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const result = name ? await getPokemonByName(name) : await getAll();
    res.status(200).json(result);
  } catch (error) {
    const result = name ? "Name error " + error.message : "GET ALL error";
    res.status(400).send(result);
  }
});

pokemonRouter.get("/:id", async (req, res) => {
  try {
    const result = await getPokemonById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

pokemonRouter.post("/", async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } =
      req.body;
    const data = { name, hp, attack, defense, speed, height, weight, image };
    let newPokemon = await Pokemon.create(data);

    types ? newPokemon.addTypes(types) : newPokemon.addTypes(19);

    res.status(200).send(`Pokemon ${name} successfully created!`);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = pokemonRouter;
