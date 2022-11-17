import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, postPokemon } from "../../redux/actions/index";
import "./CreatePokemon.css";
import Navbar from "../Navbar/Navbar";

const CreatePokemon = (props) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const changeHandler = async (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "types") {
      if (!inputs[property]) {
        //? Si no tiene la propiedad la crea
        setInputs({ ...inputs, [property]: [value] });
      } else if (inputs[property].includes(value)) {
        //? Si ya incluye lo filtra
        setInputs({
          ...inputs,
          [property]: [...inputs[property].filter((obj) => obj !== value)],
        });
      } else {
        //? Si tiene la propiedad y no incluye el valor lo agrega
        await setInputs({
          ...inputs,
          [property]: [...inputs[property], value],
        });
      }
    } else if (property === "name") {
      setInputs({ ...inputs, [property]: value.toLowerCase() });
    } else {
      setInputs({ ...inputs, [property]: value });
    }
    console.log(inputs);
  };

  const clickHandler = async () => {
    alert(await dispatch(postPokemon(inputs)));
  };

  return (
    <div className="create-pokemon">
      <Navbar />
      <div className="form">
        <h1>Create pokemon</h1>
        <div className="form-section">
          <label htmlFor="" className="section-title">
            Description
          </label>
          <div className="section-border">
            <input
              type="text"
              placeholder="name"
              id="name"
              name="name"
              onChange={(e) => changeHandler(e)}
            />
            <input
              type="text"
              placeholder="Image URL"
              id="image"
              name="image"
              onChange={(e) => changeHandler(e)}
            />
            <input
              type="number"
              placeholder="height"
              id="height"
              name="height"
              onChange={(e) => changeHandler(e)}
            />
            <input
              type="number"
              placeholder="weight"
              id="weight"
              name="weight"
              onChange={(e) => changeHandler(e)}
            />
          </div>
        </div>
        <div className="form-section">
          <label htmlFor="" className="section-title">
            Stats
          </label>
          <div className="section-border">
            <input
              type="number"
              placeholder="hp"
              id="hp"
              name="hp"
              onChange={(e) => changeHandler(e)}
            />
            <input
              type="number"
              placeholder="attack"
              id="attack"
              name="attack"
              onChange={(e) => changeHandler(e)}
            />
            <input
              type="number"
              placeholder="defense"
              id="defense"
              name="defense"
              onChange={(e) => changeHandler(e)}
            />
            <input
              type="number"
              placeholder="speed"
              id="speed"
              name="speed"
              onChange={(e) => changeHandler(e)}
            />
          </div>
        </div>
        <div className="form-section">
          <label htmlFor="" className="section-title">
            Types
          </label>
          <div className="checksContainer form-section section-border">
            {types?.map((type) => (
              <span>
                <input
                  className="check"
                  onChange={(e) => changeHandler(e)}
                  type="checkbox"
                  name="types"
                  id={type.id}
                  value={type.id}
                />
                <label className="check" htmlFor={type.id}>
                  {type.name.charAt(0).toUpperCase().concat(type.name.slice(1))}
                </label>
              </span>
            ))}
          </div>
        </div>
        <div className="form-section">
          <button onClick={(e) => clickHandler(e)} id="createBtn">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePokemon;
