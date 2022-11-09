import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  return (
    <div className="landing">
      <div className="infoLanding">
        <div className="sectionLanding1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt=""
          />
          <Link to="/home" id="btnLanding">
            Comenzar
          </Link>
        </div>
        <div className="sectionLanding2">
          <img
            src="https://freepngimg.com/thumb/pokemon/20048-2-pikachu-hd.png"
            alt=""
          />
        </div>
        <div className="mountain"></div>
      </div>
    </div>
  );
};

export default LandingPage;
