const { Router } = require("express");
const {
  getAll,
  getPokemonById,
  getPokemonByName,
  createPokemon,
} = require("../controllers/pokemons");
const { Pokemon } = require("../db");
const checkData = require("../middlewares/checkData");

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

pokemonRouter.post("/", checkData, async (req, res) => {
  try {
    createPokemon(req.body);
    res.status(200).send(`Pokemon successfully created!`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = pokemonRouter;
