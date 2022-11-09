import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./Home.css";

const Home = (props) => {
  const dispatch = useDispatch();
  let pokemons = useSelector((state) => state.pokemons);
  console.log(pokemons);
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);
  return (
    <div className="home">
      {pokemons.length ? (
        <div className="container">
          <div className="filters">
            <h1>FILTROS</h1>
          </div>
          <div className="pokemons">
            {pokemons.map((pokemon) => {
              return (
                <PokemonCard
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div class="wrapper">
          <div class="pokeball"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
