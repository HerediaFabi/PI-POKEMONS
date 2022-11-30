const axios = require("axios");
const { Type } = require("../db");

const getAll = async () => {
  const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");

  for (let i = 0; i < apiTypes.data.results.length; i++) {
    await Type.findOrCreate({ where: { name: apiTypes.data.results[i].name } });
  }

  return await Type.findAll();
};

module.exports = getAll;
