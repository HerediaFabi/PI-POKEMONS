import React from "react";
import "./PokemonCard.css";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {
  return (
    <div className="basicCard">
      <p className="name">{props.name}</p>
      <img src={props.image} alt={props.name} />
      <div className="types">
        {props.types.map((t) => {
          return (
            <p className="type" key={t}>
              {t}
            </p>
          );
        })}
      </div>
      <Link to={`/pokemons/${props.id}`}>Ver detalle</Link>
    </div>
  );
};

export default PokemonCard;
