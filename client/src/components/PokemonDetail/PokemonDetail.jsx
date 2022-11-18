import React from "react";
import styles from "./PokemonDetail.module.css";
import iconsStyles from "../../css/icons.module.css";
import cardStyles from "../../css/card.module.css";
import { getPokemonById, cleanDetail } from "../../redux/actions/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  console.log(props);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase().concat(string.slice(1));
  };

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch]);

  const pokemon = useSelector((state) => state.pokemonDetail);
  console.log(pokemon);

  return (
    <div className={styles.detail}>
      <Navbar />
      {Object.keys(pokemon).length !== 0 ? (
        <div className={`${styles["detail-card"]} ${cardStyles.card}`}>
          <p
            className={`${styles["detail-name"]} ${
              iconsStyles[
                pokemon.types[0].hasOwnProperty("name")
                  ? pokemon.types[0].name
                  : pokemon.types[0]
              ]
            }`}
          >
            {pokemon.name}
          </p>
          <div className={styles["section-group"]}>
            <div className={styles["detail-section"]}>
              <div
                className={`${iconsStyles.icon} ${styles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-id"]}`}
              >
                <img
                  src="https://img.icons8.com/ios-filled/512/pokeball--v2.png"
                  alt=""
                />
                <span className={styles.tooltiptext}>
                  <p>ID: {pokemon.id}</p>
                </span>
              </div>
              <div
                className={`${iconsStyles.icon} ${styles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-weight"]}`}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/512/weight-1.png  "
                  alt=""
                />
                <span className={styles.tooltiptext}>
                  <p>Weight: {pokemon.weight}</p>
                </span>
              </div>
              <div
                className={`${iconsStyles.icon} ${styles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-height"]}`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4733/4733563.png"
                  alt=""
                />
                <span className={styles.tooltiptext}>
                  <p> Height: {pokemon.height}</p>
                </span>
              </div>
            </div>
            <div className={styles["detail-section"]}>
              <div id="pokemon-image">
                <img src={pokemon.image} alt={pokemon.name} />
              </div>
              <div id="pokemon-hp">
                <div className="hp-bar"></div>
                <p>{pokemon.hp} HP</p>
              </div>
            </div>
            <div className="detail-section">
              <div
                className={`${iconsStyles.icon} ${styles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-attack"]}`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8294/8294510.png"
                  alt=""
                />
                <span className={styles.tooltiptext}>
                  <p>Attack: {pokemon.attack}</p>
                </span>
              </div>
              <div
                className={`${iconsStyles.icon} ${styles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-defense"]}`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8294/8294515.png"
                  alt=""
                />
                <span className={styles.tooltiptext}>
                  <p>Defense: {pokemon.defense}</p>
                </span>
              </div>
              <div
                className={`${iconsStyles.icon} ${styles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-speed"]}`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4824/4824507.png"
                  alt=""
                />
                <span className={styles.tooltiptext}>
                  <p>Speed: {pokemon.speed}</p>
                </span>
              </div>
            </div>
          </div>
          <div className="section-group">
            <div className="detail-section">
              <div id="pokemon-types ">
                {pokemon.types?.map((t) => {
                  return (
                    <div class={`icon ${t.name ? t.name : t} tooltip`}>
                      <span class="tooltiptext">
                        {capitalize(t.name ? t.name : t)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default PokemonDetail;
