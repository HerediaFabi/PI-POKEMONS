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
          return <p className="type">{t}</p>;
        })}
      </div>
      <Link to={`/pokemon`}>Ver detalle</Link>
    </div>
  );
};

export default PokemonCard;
