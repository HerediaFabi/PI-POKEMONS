const { Router } = require("express");
const pokemonsRouter = require("./pokemons");
const typesRouter = require("./types");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const indexRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
indexRouter.use("/pokemons", pokemonsRouter);
indexRouter.use("/types", typesRouter);

module.exports = indexRouter;
