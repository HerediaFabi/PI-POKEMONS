import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";

export const getPokemons = () => {
  return async function (dispatch) {
    const info = await axios.get("http://localhost:3001/pokemons");
    dispatch({ type: GET_POKEMONS, payload: info.data });
  };
};
