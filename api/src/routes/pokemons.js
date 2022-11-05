const { Router } = require("express");
const { getAllPokemons } = require("../controllers/pokemons");

const pokemonRouter = Router();

pokemonRouter.get("/", async (req, res) => {
  //   const { name } = req.query;
  const result = await getAllPokemons();
  //   res.status(200).send(name ? "GET pokemons " + name : "GET all pokemons");
  res.status(200).json(result);
});

pokemonRouter.get("/:id", (req, res) => {
  res.status(200).send("GET pokemon " + req.params.id);
});

pokemonRouter.post("/", (req, res) => {
  res.status(200).send("POST pokemon");
});

module.exports = pokemonRouter;
