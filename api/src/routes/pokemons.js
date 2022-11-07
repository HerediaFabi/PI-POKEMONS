const { Router } = require("express");
const { getAllPokemons, getPokemon } = require("../controllers/pokemons");

const pokemonRouter = Router();

pokemonRouter.get("/", async (req, res) => {
  const { name } = req.query;
  const result = name ? await getPokemon(name, "name") : await getAllPokemons();
  res.status(200).json(result);
});

pokemonRouter.get("/:id", async (req, res) => {
  const result = await getPokemon(req.params.id, "id");
  res.status(200).json(result);
});

pokemonRouter.post("/", (req, res) => {
  res.status(200).send("POST pokemon");
});

module.exports = pokemonRouter;
