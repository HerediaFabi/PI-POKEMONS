import React from "react";
import "./CreatePokemon.css";
import Navbar from "../Navbar/Navbar";

const CreatePokemon = (props) => {
  return (
    <>
      <Navbar />
      <div className="form">
        <input type="text" id="name" />
        <label htmlFor="name">Name</label>
        <input type="text" id="image" />
        <label htmlFor="image">Image URL</label>
        <select name="" id="types">
          <option value="">Types</option>
        </select>
        <input type="number" name="" id="id" />
        <label htmlFor="id">Id</label>
        <input type="number" name="" id="hp" />
        <label htmlFor="hp">HP</label>
        <input type="number" name="" id="attack" />
        <label htmlFor="attack">Attack</label>
        <input type="number" name="" id="defense" />
        <label htmlFor="defense">Defense</label>
        <input type="number" name="" id="speed" />
        <label htmlFor="speed">Speed</label>
        <input type="number" name="" id="height" />
        <label htmlFor="height">Height</label>
        <input type="number" name="" id="weight" />
        <label htmlFor="weight">Weight</label>
        <button>Create</button>
      </div>
    </>
  );
};

export default CreatePokemon;
