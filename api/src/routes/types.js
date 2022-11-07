const { Router } = require("express");
const getAll = require("../controllers/types");

const typesRouter = Router();

typesRouter.get("/", async (req, res) => {
  const result = await getAll();
  res.status(200).json(result);
  // res.status(200).send("GET all types");
});

module.exports = typesRouter;
