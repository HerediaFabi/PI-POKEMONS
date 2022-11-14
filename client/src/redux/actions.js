import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";

export const getPokemons = () => {
  return async function (dispatch) {
    const info = await axios.get("http://localhost:3001/pokemons");
    dispatch({ type: GET_POKEMONS, payload: info.data });
  };
};

export const getPokemonById = (id) => {
  return async function (dispatch) {
    const info = await axios.get("http://localhost:3001/pokemons/" + id);
    dispatch({ type: GET_POKEMON_BY_ID, payload: info.data });
  };
};
