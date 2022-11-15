import React from "react";
import "./PokemonDetail.css";
import "../../css/types.css";
import { getPokemonById } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();

  console.log(props.match.params.id);

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch]);

  const pokemon = useSelector((state) => state.pokemonDetail);
  console.log(pokemon);

  return (
    <div className="detail">
      <Navbar />
      <div className="detail-card">
        <p className="name">{pokemon.name}</p>
        <div className="section-group">
          <div className="detail-section">
            <div className="icon" id="pokemon-id">
              <p>ID: {pokemon.id}</p>
            </div>
            <div className="icon" id="pokemon-weight">
              <p>WEIGHT: {pokemon.weight}</p>
            </div>
            <div className="icon" id="pokemon-height">
              <p> HEIGHT: {pokemon.height}</p>
            </div>
          </div>
          <div className="detail-section">
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
          <div className="detail-section">
            <div className="icon" id="pokemon-attack">
              <p>ATTACK: {pokemon.attack}</p>
            </div>
            <div className="icon" id="pokemon-defense">
              <p>DEFENSE: {pokemon.defense}</p>
            </div>
            <div className="icon" id="pokemon-speed">
              <p>SPEED: {pokemon.speed}</p>
            </div>
          </div>
        </div>
        <div className="section-group">
          <div className="detail-section">
            <div id="pokemon-hp">
              <p>HP: {pokemon.hp}</p>
            </div>
            <div id="pokemon-types ">
              {pokemon.types?.map((t) => {
                return (
                  <div title={t} class={`icon ${t} tooltip`}>
                    <span class="tooltiptext">
                      {t.charAt(0).toUpperCase().concat(t.slice(1))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PokemonDetail;
