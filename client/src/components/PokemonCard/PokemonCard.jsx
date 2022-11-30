import React from "react";
import styles from "./PokemonCard.module.css";
import iconsStyles from "../../css/icons.module.css";
import cardStyles from "../../css/card.module.css";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {
  const cardType = iconsStyles[props.mainType];

  return (
    <div className={`${cardStyles.card}  ${cardType}`}>
      <p className={styles.name}>{props.name}</p>
      <img src={props.image} alt={props.name} />
      <div className={styles["pokemon-types"]}>
        {props.types.map((t) => {
          return (
            <div
              key={t}
              className={`${iconsStyles.icon} ${
                iconsStyles[t.name ? t.name : t]
              } ${iconsStyles.tooltip}`}
            >
              <span className={iconsStyles.tooltiptext}>
                {(t.name ? t.name : t)
                  .charAt(0)
                  .toUpperCase()
                  .concat((t.name ? t.name : t).slice(1))}
              </span>
            </div>
          );
        })}
      </div>
      <div className={styles["button-container"]}>
        <Link to={`/pokemons/${props.id}`} className={styles.button}>
          <span>Ver detalle</span>
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;
