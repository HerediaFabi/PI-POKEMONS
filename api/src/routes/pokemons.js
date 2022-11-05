const { Router } = require("express");

const pokemonRouter = Router();

pokemonRouter.get("/", (req, res) => {
  const { name } = req.query;
  res.status(200).send(name ? "GET pokemons " + name : "GET all pokemons");
});

pokemonRouter.get("/:id", (req, res) => {
  res.status(200).send("GET pokemon " + req.params.id);
});

pokemonRouter.post("/", (req, res) => {
  res.status(200).send("POST pokemon");
});

module.exports = pokemonRouter;
