import React, { useState, useEffect } from "react";
import styles from "./PokemonDetail.module.css";
import iconsStyles from "../../css/icons.module.css";
import cardStyles from "../../css/card.module.css";
import {
  getPokemonById,
  cleanDetail,
  deletePokemon,
  toggleModal,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const [modalValues, setModalValues] = useState({
    message: "",
    btnYes: "",
    btnYesAction: "",
    btnNo: "",
    btnNoAction: "",
  });

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
    return () => {
      if (modal) dispatch(toggleModal());
    };
  }, [dispatch]);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase().concat(string.slice(1));
  };

  const showModalFunction = (
    message,
    btnYes,
    btnYesAction,
    btnNo,
    btnNoAction
  ) => {
    if (!modal) dispatch(toggleModal());
    setModalValues({
      message: message,
      btnYes: btnYes,
      btnYesAction: btnYesAction,
      btnNo: btnNo,
      btnNoAction: btnNoAction,
    });
  };

  const pokemon = useSelector((state) => state.pokemonDetail);

  return (
    <div className={styles.detail}>
      <Navbar />
      {console.log(pokemon)}
      <Modal
        status={modal}
        message={modalValues.message}
        btnYes={modalValues.btnYes}
        btnYesAction={modalValues.btnYesAction}
        btnNo={modalValues.btnNo}
        btnNoAction={modalValues.btnNoAction}
      />
      {Object.keys(pokemon).length !== 0 && !pokemon.hasOwnProperty("error") ? (
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
          {pokemon.hasOwnProperty("createdAt") && (
            <div className={styles["db-icons"]}>
              <button
                className={`${iconsStyles.tooltip} ${styles["button"]} ${styles["delete-button"]}`}
                onClick={() =>
                  showModalFunction(
                    `Are you sure you want to delete ${capitalize(
                      pokemon.name
                    )}?`,
                    true,
                    () => {
                      dispatch(deletePokemon(pokemon.id));
                      dispatch(toggleModal());
                    },

                    true,
                    () => {
                      dispatch(toggleModal());
                    }
                  )
                }
              >
                <img
                  src="https://img.icons8.com/ios-filled/512/delete.png"
                  alt=""
                />
                <span
                  className={`${iconsStyles.tooltiptext} ${iconsStyles["tooltiptext-right"]}`}
                >
                  <p>DELETE</p>
                </span>
              </button>
              <button
                className={`${iconsStyles.tooltip} ${styles["button"]} ${styles["update-button"]}`}
              >
                <Link to={`/updatePokemon/${pokemon.id}`}>
                  <img
                    src="https://img.icons8.com/metro/512/pencil.png"
                    alt=""
                  />
                  <span
                    className={`${iconsStyles.tooltiptext} ${iconsStyles["tooltiptext-left"]}`}
                  >
                    <p>UPDATE</p>
                  </span>
                </Link>
              </button>
            </div>
          )}

          <div className={styles["section-group"]}>
            <div className={styles["detail-section"]}>
              <div
                className={`${iconsStyles.icon} ${iconsStyles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-id"]}`}
              >
                <img
                  src="https://img.icons8.com/ios-filled/512/pokeball--v2.png"
                  alt=""
                />
                <span className={iconsStyles.tooltiptext}>
                  <p>ID: {pokemon.id}</p>
                </span>
              </div>
              <div
                className={`${iconsStyles.icon} ${iconsStyles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-weight"]}`}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/512/weight-1.png  "
                  alt=""
                />
                <span className={iconsStyles.tooltiptext}>
                  <p>Weight: {pokemon.weight}</p>
                </span>
              </div>
              <div
                className={`${iconsStyles.icon} ${iconsStyles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-height"]}`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4733/4733563.png"
                  alt=""
                />
                <span className={iconsStyles.tooltiptext}>
                  <p> Height: {pokemon.height}</p>
                </span>
              </div>
            </div>
            <div className={styles["detail-section"]}>
              <div className={styles["pokemon-image"]}>
                <img src={pokemon.image} alt={pokemon.name} />
              </div>
              <div className={styles["pokemon-hp"]}>
                <div className={styles["hp-bar"]}></div>
                <p>{pokemon.hp} HP</p>
              </div>
            </div>
            <div className={styles["detail-section"]}>
              <div
                className={`${iconsStyles.icon} ${iconsStyles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-attack"]}`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8294/8294510.png"
                  alt=""
                />
                <span className={iconsStyles.tooltiptext}>
                  <p>Attack: {pokemon.attack}</p>
                </span>
              </div>
              <div
                className={`${iconsStyles.icon} ${iconsStyles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-defense"]}`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8294/8294515.png"
                  alt=""
                />
                <span className={iconsStyles.tooltiptext}>
                  <p>Defense: {pokemon.defense}</p>
                </span>
              </div>
              <div
                className={`${iconsStyles.icon} ${iconsStyles["detail-icon"]} ${iconsStyles.tooltip} ${iconsStyles["pokemon-speed"]}`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4824/4824507.png"
                  alt=""
                />
                <span className={iconsStyles.tooltiptext}>
                  <p>Speed: {pokemon.speed}</p>
                </span>
              </div>
            </div>
          </div>
          <div className={styles["section-group"]}>
            <div className={styles["detail-section"]}>
              <div className={iconsStyles["pokemon-types"]}>
                {pokemon.types?.map((t) => {
                  return (
                    <div
                      className={`${iconsStyles.icon} ${iconsStyles.types} ${
                        iconsStyles["detail-icon"]
                      } ${iconsStyles[t.name ? t.name : t]} ${
                        iconsStyles.tooltip
                      }`}
                    >
                      <span className={iconsStyles.tooltiptext}>
                        {capitalize(t.name ? t.name : t)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : pokemon.hasOwnProperty("error") ? (
        <div className={styles["not-found"]}>
          <p>{pokemon.error}</p>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default PokemonDetail;
