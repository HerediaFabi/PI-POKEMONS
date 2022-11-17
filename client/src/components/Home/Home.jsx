import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getPokemonByName } from "../../redux/actions/index";
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginated from "../Paginated/Paginated";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Home = (props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.allPokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputs, setInputs] = useState({});
  const LastPokemon = currentPage * 12;
  const FirstPokemon = LastPokemon - 12;
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPokemons = filteredPokemons.slice(FirstPokemon, LastPokemon);

  const paginated = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!pokemons.length) dispatch(getPokemons());
  }, [dispatch]);

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    switch (event.target.name) {
      case "name":
        setInputs({ ...inputs, [property]: value });
        console.log(inputs["name"]);
        break;

      default:
        break;
    }
  };

  const clickHandler = async (event) => {
    if (inputs.name) {
      // console.log(await dispatch(getPokemonByName(inputs.name)));
      await dispatch(getPokemonByName(inputs.name));
    } else {
      alert("Name empty");
    }
  };

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
                  name="name"
                />
                <button onClick={(e) => clickHandler(e)}>Search</button>
              </div>
              <div id="pkmByOrigin">
                <select name="" id="">
                  <option hidden label="Select origin" value="-1"></option>
                  <option value="all">All pokemons</option>
                  <option value="api">API pokemons</option>
                  <option value="db">Database pokemons</option>
                </select>
              </div>
              <div id="alphabeticOrder">
                <select
                  onChange={(e) => changeHandler(e)}
                  name="alphabeticOrder"
                  id=""
                >
                  <option hidden label="Select order" value="-1"></option>
                  <option value="indistinct">Indistinct</option>
                  <option value="alphabeticAsc">A-Z</option>
                  <option value="alphabeticDesc">Z-A</option>
                </select>
              </div>
              <div id="attackOrder">
                <select name="" id="">
                  <option hidden label="Select stat" value="-1"></option>
                  <option value="indistinct">Indistinct</option>
                  <option value="max_attack">Max attack</option>
                  <option value="min_attack">Min attack</option>
                </select>
              </div>
            </div>
            <div className="pokemons">
              <Paginated
                key="paginated1"
                array={filteredPokemons}
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
                array={filteredPokemons}
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
