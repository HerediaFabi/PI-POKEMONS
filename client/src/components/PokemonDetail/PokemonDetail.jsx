import React from "react";
import "./PokemonDetail.css";
import "./types.css";
import { getPokemonById } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();

  console.log(props.match.params.id);

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch]);

  const pokemon = useSelector((state) => state.pokemonDetail);
  console.log(pokemon);

  return (
    <div>
      <div className="types wrapper">
        {pokemon.types?.map((t) => {
          return (
            <div class={`icon ${t}`}>
              <img src={`../../images/icons/${t}.svg`} alt={t} />
            </div>
          );
        })}
      </div>
      <div className="basicCard">
        <p className="name">{pokemon.name}</p>
        <img src={pokemon.image} alt={pokemon.name} />
        <div className="types wrapper">
          {pokemon.types?.map((t) => {
            return (
              <div class={`icon ${t}`}>
                <img src={`../../images/icons/${t}.svg`} alt={t} />
              </div>
            );
          })}
        </div>
        <p>ID: {pokemon.id}</p>
        <p>
          <u>STATS:</u> HP: {pokemon.hp} | ATTACK: {pokemon.attack} | DEFENSE:{" "}
          {pokemon.defense}| SPEED: {pokemon.speed}
        </p>
        <p>
          WEIGHT: {pokemon.weight} | HEIGHT: {pokemon.height}
        </p>
      </div>
    </div>
  );
};
export default PokemonDetail;
