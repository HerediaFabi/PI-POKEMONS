import {
  GET_POKEMONS,
  GET_DB_POKEMONS,
  GET_API_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  ALPHABETIC_ASC,
  ALPHABETIC_DESC,
  CLEAN_DETAIL,
} from "../actions/index";

import { alphabeticAsc, alphabeticDesc } from "./helpers";

const initialState = {
  allPokemons: [],
  filteredPokemons: [],
  pokemonDetail: {},
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
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
      return { ...state, filteredPokemons: [] };

    case GET_API_POKEMONS:
      return { ...state, filteredPokemons: [] };

    case ALPHABETIC_ASC:
      return { ...state, filteredPokemons: alphabeticAsc(state.allPokemons) };

    case ALPHABETIC_DESC:
      return { ...state, filteredPokemons: alphabeticDesc(state.allPokemons) };

    default:
      return { ...state };
  }
};

export default rootReducer;
