import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DB_POKEMONS = "GET_DB_POKEMONS";
export const GET_API_POKEMONS = "GET_API_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const A_Z = "A_Z";
export const Z_A = "Z_A";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const RECHARGE_ALL_POKEMONS = "RECHARGE_ALL_POKEMONS";
export const INDISTINCT_ORDER = "INDISTINCT_ORDER";

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

export const rechargeAllPokemons = () => {
  return function (dispatch) {
    dispatch({ type: RECHARGE_ALL_POKEMONS });
  };
};

export const cleanDetail = () => {
  return function (dispatch) {
    dispatch({ type: CLEAN_DETAIL });
  };
};

export const originFilter = (value) => {
  return function (dispatch) {
    switch (value) {
      case "api":
        dispatch({ type: GET_API_POKEMONS });
        break;

      case "db":
        dispatch({ type: GET_DB_POKEMONS });
        break;

      default:
        dispatch(rechargeAllPokemons());
        break;
    }
  };
};

export const alphabeticOrder = (value) => {
  return function (dispatch) {
    switch (value) {
      case "a_z":
        dispatch({ type: A_Z });
        break;

      case "z_a":
        dispatch({ type: Z_A });
        break;

      default:
        dispatch({ type: INDISTINCT_ORDER });
        break;
    }
  };
};

// export const
