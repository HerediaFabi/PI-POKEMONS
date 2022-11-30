import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DB_POKEMONS = "GET_DB_POKEMONS";
export const GET_API_POKEMONS = "GET_API_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const A_Z = "A_Z";
export const Z_A = "Z_A";
export const MAX_ATTACK = "MAX_ATTACK";
export const MIN_ATTACK = "MIX_ATTACK";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const RECHARGE_ALL_POKEMONS = "RECHARGE_ALL_POKEMONS";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const TOGGLE_LOADER = "TOGGLE_LOADER";

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const info = await axios.get(`http://localhost:3001/pokemons`);
      dispatch({ type: GET_POKEMONS, payload: info.data });
    } catch (error) {
      dispatch({ type: GET_POKEMONS, payload: error.response.data });
    }
  };
};

export const getPokemonById = (id) => {
  return async function (dispatch) {
    try {
      const info = await axios.get(`http://localhost:3001/pokemons/${id}`);
      dispatch({ type: GET_POKEMON_BY_ID, payload: info.data });
    } catch (error) {
      dispatch({ type: GET_POKEMON_BY_ID, payload: error.response.data });
    }
  };
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const info = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
      console.log(info.data);
      dispatch({ type: GET_POKEMON_BY_NAME, payload: info.data });
    } catch (error) {
      dispatch({ type: GET_POKEMON_BY_NAME, payload: error.response.data });
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const info = await axios.get("http://localhost:3001/types");
      dispatch({ type: GET_TYPES, payload: info.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postPokemon = (data) => {
  return async function () {
    try {
      const response = await axios.post("http://localhost:3001/pokemons", data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };
};

export const putPokemon = (id, data) => {
  return async function () {
    try {
      const response = await axios.put(
        "http://localhost:3001/pokemons/" + id,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };
};

export const deletePokemon = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete("http://localhost:3001/pokemons/" + id);
      dispatch({ type: DELETE_POKEMON });
    } catch (error) {
      return "ERROR";
    }
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
        break;
    }
  };
};

export const statsOrder = (value) => {
  return function (dispatch) {
    switch (value) {
      case "max_attack":
        dispatch({ type: MAX_ATTACK });
        break;

      case "min_attack":
        dispatch({ type: MIN_ATTACK });
        break;

      default:
        break;
    }
  };
};

export const toggleModal = () => {
  return function (dispatch) {
    dispatch({ type: TOGGLE_MODAL });
  };
};

export const toggleLoader = () => {
  return function (dispatch) {
    dispatch({ type: TOGGLE_LOADER });
  };
};
