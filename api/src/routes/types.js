const { Router } = require("express");
const getAll = require("../controllers/types");

const typesRouter = Router();

typesRouter.get("/", async (req, res) => {
  try {
    const result = await getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = typesRouter;
