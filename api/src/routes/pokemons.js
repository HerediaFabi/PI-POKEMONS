const { Router } = require("express");
const {
  getAll,
  getPokemonById,
  getPokemonByName,
  createPokemon,
  deletePokemon,
  updatePokemon,
} = require("../controllers/pokemons");
const checkData = require("../middlewares/checkData");

const pokemonRouter = Router();

pokemonRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const result = name ? await getPokemonByName(name) : await getAll();
    res.status(200).json(result);
  } catch (error) {
    name
      ? res.status(404).json([
          {
            error: `No pokemon with the name ${name.toUpperCase()} was found`,
            code: 404,
          },
        ])
      : res.status(408).json([{ error: "Timeout error", code: 408 }]);
  }
});

pokemonRouter.get("/:id", async (req, res) => {
  try {
    const result = await getPokemonById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Pokemon not found" });
  }
});

pokemonRouter.post("/", checkData, async (req, res) => {
  try {
    await createPokemon(req.body);
    res
      .status(200)
      .send(
        `Pokemon successfully created! Please refresh the home page to see it!`
      );
  } catch (error) {
    res.status(400).send(error);
  }
});

pokemonRouter.delete("/:id", async (req, res) => {
  try {
    await deletePokemon(req.params.id);
    res
      .status(200)
      .send(
        `Pokemon successfully deleted! Please refresh the home page to see it!`
      );
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
});

pokemonRouter.put("/:id", async (req, res) => {
  try {
    await updatePokemon(req.params.id, req.body);
    res
      .status(200)
      .send(
        `Pokemon successfully updated! Please refresh the home page to see it!`
      );
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
});

module.exports = pokemonRouter;
