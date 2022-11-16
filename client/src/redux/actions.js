import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
const POST_POKEMON = "POST_POKEMON";

export const getPokemons = () => {
  return async function (dispatch) {
    const info = await axios.get(`http://localhost:3001/pokemons`);
    dispatch({ type: GET_POKEMONS, payload: info.data });
  };
};

export const getPokemonById = (id) => {
  return async function (dispatch) {
    const info = await axios.get(`http://localhost:3001/pokemons/${id}`);
    dispatch({ type: GET_POKEMON_BY_ID, payload: info.data });
  };
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    let info = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
    dispatch({ type: GET_POKEMON_BY_NAME, payload: info.data });
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    const info = await axios.get("http://localhost:3001/types");
    dispatch({ type: GET_TYPES, payload: info.data });
  };
};

export const postPokemon = (data) => {
  return async function () {
    const info = await axios.post("http://localhost:3001/pokemons", data);
    return info.data;
  };
};
