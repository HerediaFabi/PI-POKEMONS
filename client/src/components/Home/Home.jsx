import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginado from "../Paginado/Paginado";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Home = (props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.allPokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const LastPokemon = currentPage * 12;
  const FirstPokemon = LastPokemon - 12;
  const currentPokemons = pokemons.slice(FirstPokemon, LastPokemon);

  const paginated = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="home">
        {pokemons.length ? (
          <div className="container">
            <div className="filters">
              <div id="pkmByName">
                <input type="text" placeholder="Search by name" />
                <button>Search</button>
              </div>
              <div id="pkmByOrigin">
                <select name="" id="">
                  <option value="all">All pokemons</option>
                  <option value="api">API pokemons</option>
                  <option value="db">Database pokemons</option>
                </select>
              </div>
              <div id="alphabeticOrder">
                <select name="" id="">
                  <option value="indistinct">Indistinct</option>
                  <option value="a_z">A-Z</option>
                  <option value="z_a">Z-A</option>
                </select>
              </div>
              <div id="attackOrder">
                <select name="" id="">
                  <option value="indistinct">Indistinct</option>
                  <option value="max_attack">Max attack</option>
                  <option value="min_attack">Min attack</option>
                </select>
              </div>
            </div>
            <div className="pokemons">
              <Paginado key="paginado" array={pokemons} paginated={paginated} />
              {currentPokemons?.map((pokemon) => {
                return (
                  <PokemonCard
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <div className="pokeball"></div>
            <span className="loadingText">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
