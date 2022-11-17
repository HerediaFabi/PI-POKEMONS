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
  INDISTINCT_ORDER,
  // RECHARGE_FILTERED_POKEMONS,
} from "../actions/index";

import {
  alphabeticAsc,
  alphabeticDesc,
  apiPokemons,
  dbPokemons,
  indistinctOrder,
} from "./helpers";

const initialState = {
  allPokemons: [],
  filteredPokemons: [],
  noOrder: [],
  pokemonDetail: {},
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        noOrder: action.payload,
        filteredPokemons: action.payload,
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
        noOrder: dbPokemons(state.allPokemons),
        filteredPokemons: dbPokemons(state.allPokemons),
      };

    case GET_API_POKEMONS:
      return {
        ...state,
        noOrder: apiPokemons(state.allPokemons),
        filteredPokemons: apiPokemons(state.allPokemons),
      };

    case RECHARGE_ALL_POKEMONS:
      return {
        ...state,
        noOrder: state.allPokemons,
        filteredPokemons: state.allPokemons,
      };

    case A_Z:
      return {
        ...state,
        filteredPokemons: alphabeticAsc(state.filteredPokemons),
      };

    case Z_A:
      return {
        ...state,
        filteredPokemons: alphabeticDesc(state.filteredPokemons),
      };

    case INDISTINCT_ORDER:
      return {
        ...state,
        filteredPokemons: indistinctOrder(state.filteredPokemons),
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
