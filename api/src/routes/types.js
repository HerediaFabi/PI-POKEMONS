const { Router } = require("express");

const typesRouter = Router();

typesRouter.get("/", (req, res) => {
  res.status(200).send("GET all types");
});

module.exports = typesRouter;
