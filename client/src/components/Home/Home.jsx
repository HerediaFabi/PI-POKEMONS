import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getPokemonByName } from "../../redux/actions";
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginated from "../Paginated/Paginated";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Home = (props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.allPokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const LastPokemon = currentPage * 12;
  const FirstPokemon = LastPokemon - 12;
  const [filteredPokemons, setFilteredPokemons] = useState([...pokemons]);
  const currentPokemons = filteredPokemons.slice(FirstPokemon, LastPokemon);
  console.log(pokemons);

  const paginated = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const changeHandler = (event) => {};

  const clickHandler = (event) => {};

  return (
    <>
      <Navbar />
      <div className="home">
        {filteredPokemons.length ? (
          <div className="container">
            <div className="filters">
              <div id="pkmByName">
                <input
                  onChange={(e) => changeHandler(e)}
                  type="text"
                  placeholder="Search by name"
                />
                <button onClick={(e) => clickHandler(e)}>Search</button>
              </div>
              <div id="pkmByOrigin">
                <select name="" id="">
                  <option disabled value="">
                    Select origin
                  </option>
                  <option value="all">All pokemons</option>
                  <option value="api">API pokemons</option>
                  <option value="db">Database pokemons</option>
                </select>
              </div>
              <div id="alphabeticOrder">
                <select name="" id="">
                  <option value="" disabled>
                    Select order
                  </option>
                  <option value="indistinct">Indistinct</option>
                  <option value="a_z">A-Z</option>
                  <option value="z_a">Z-A</option>
                </select>
              </div>
              <div id="attackOrder">
                <select name="" id="">
                  <option value="" disabled>
                    Select stat
                  </option>
                  <option value="indistinct">Indistinct</option>
                  <option value="max_attack">Max attack</option>
                  <option value="min_attack">Min attack</option>
                </select>
              </div>
            </div>
            <div className="pokemons">
              <Paginated
                key="paginated1"
                array={pokemons}
                paginated={paginated}
                name="paginado1"
                currentPage={currentPage}
              />
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
              <Paginated
                key="paginated2"
                array={pokemons}
                paginated={paginated}
                name="paginado2"
                currentPage={currentPage}
              />
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
