import {
  GET_POKEMONS,
  GET_DB_POKEMONS,
  GET_API_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  A_Z,
  Z_A,
  CLEAN_DETAIL,
  RECHARGE_ALL_POKEMONS,
  MAX_ATTACK,
  MIN_ATTACK,
  DELETE_POKEMON,
  TOGGLE_MODAL,
  TOGGLE_LOADER,
} from "../actions/index";

import {
  alphabeticAsc,
  alphabeticDesc,
  apiPokemons,
  dbPokemons,
  attackMax,
  attackMin,
} from "./helpers";

const initialState = {
  allPokemons: [],
  filteredPokemons: [],
  pokemonDetail: {},
  types: [],
  modal: false,
  loader: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        filteredPokemons: action.payload,
        loader: false,
      };

    case GET_POKEMON_BY_ID:
      return { ...state, pokemonDetail: action.payload };

    case GET_POKEMON_BY_NAME:
      return { ...state, filteredPokemons: action.payload };

    case GET_TYPES:
      return { ...state, types: action.payload };

    case CLEAN_DETAIL:
      return { ...state, pokemonDetail: [] };

    case GET_DB_POKEMONS:
      return {
        ...state,
        filteredPokemons: dbPokemons(state.allPokemons),
      };

    case GET_API_POKEMONS:
      return {
        ...state,
        filteredPokemons: apiPokemons(state.allPokemons),
      };

    case RECHARGE_ALL_POKEMONS:
      console.log(state.allPokemons);
      return {
        ...state,
        filteredPokemons: state.allPokemons,
      };

    case A_Z:
      return {
        ...state,
        filteredPokemons: alphabeticAsc([...state.filteredPokemons]),
      };

    case Z_A:
      return {
        ...state,
        filteredPokemons: alphabeticDesc([...state.filteredPokemons]),
      };

    case MAX_ATTACK:
      return {
        ...state,
        filteredPokemons: attackMax([...state.filteredPokemons]),
      };

    case MIN_ATTACK:
      return {
        ...state,
        filteredPokemons: attackMin([...state.filteredPokemons]),
      };

    case DELETE_POKEMON:
      return {
        ...state,
        filteredPokemons: state.filteredPokemons.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
        pokemonDetail: { error: "Pokemon not found" },
      };

    case TOGGLE_MODAL:
      return { ...state, modal: !state.modal };

    case TOGGLE_LOADER:
      return { ...state, loader: !state.loader };

    default:
      return { ...state };
  }
};

export default rootReducer;
