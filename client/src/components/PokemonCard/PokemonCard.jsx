import React from "react";
import "./PokemonCard.css";
import "../../css/types.css";
import "../../css/cardHover.css";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {
  console.log(props.types[0]);

  const resultado = props.types[0].hasOwnProperty("name")
    ? props.types[0].name
    : props.types[0];

  return (
    <div
      className={`card 
    ${
      props.types[0].hasOwnProperty("name")
        ? props.types[0].name
        : props.types[0]
    }`}
    >
      <p className="name">{props.name}</p>
      <img src={props.image} alt={props.name} />
      <div className="pokemon-types">
        {props.types.map((t) => {
          return (
            <div class={`icon ${t.name ? t.name : t} tooltip`}>
              <span class="tooltiptext">
                {(t.name ? t.name : t)
                  .charAt(0)
                  .toUpperCase()
                  .concat((t.name ? t.name : t).slice(1))}
              </span>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <Link to={`/pokemons/${props.id}`} target="_blank" className="button">
          <span>Ver detalle</span>
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;
