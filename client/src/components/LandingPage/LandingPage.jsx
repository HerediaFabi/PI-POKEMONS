import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className="landing">
      <div className="mountain1"></div>
      <div className="mountain2"></div>
      <div className="infoLanding">
        <div className="sectionLanding1">
          <img
            id="pokemon-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt=""
          />
          <div id="btnLanding">
            <Link to="/home">Comenzar</Link>
          </div>
        </div>
        <div className="sectionLanding2">
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
