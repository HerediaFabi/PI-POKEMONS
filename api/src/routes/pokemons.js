const { Router } = require("express");
const {
  getAll,
  getPokemonById,
  getPokemonByName,
  createPokemon,
  deletePokemon,
} = require("../controllers/pokemons");
const checkData = require("../middlewares/checkData");

const pokemonRouter = Router();

pokemonRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const result = name ? await getPokemonByName(name) : await getAll();
    res.status(200).json(result);
  } catch (error) {
    // const result = name
    //   ? `No pokemon with the name ${name} was found`
    //   : "GET ALL error";
    res.status(400).send("error");
  }
});

pokemonRouter.get("/:id", async (req, res) => {
  try {
    const result = await getPokemonById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Pokemon not found" });
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

pokemonRouter.delete("/:id", async (req, res) => {
  try {
    deletePokemon(req.params.id);
    res.status(200).send(`Pokemon successfully deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
});

module.exports = pokemonRouter;
