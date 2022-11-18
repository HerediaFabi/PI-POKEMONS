import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions/index";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className={styles.landing}>
      <div className={styles.mountain1}></div>
      <div className={styles.mountain2}></div>
      <div className={styles.infoLanding}>
        <div className={styles.sectionLanding1}>
          <img
            className={styles["pokemon-logo"]}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt=""
          />
          <div className={styles.btnLanding}>
            <Link to="/home">Comenzar</Link>
          </div>
        </div>
        <div className={styles.sectionLanding2}>
          <img
            src="https://freepngimg.com/thumb/pokemon/20048-2-pikachu-hd.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
