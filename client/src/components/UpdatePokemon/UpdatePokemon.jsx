import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTypes,
  getPokemonById,
  putPokemon,
} from "../../redux/actions/index";
import styles from "./UpdatePokemon.module.css";
import Navbar from "../Navbar/Navbar";
import Input from "../Input/Input";
import InputCheck from "../InputCheck/InputCheck";
import ValidationMessage from "../ValidationMessage/ValidationMessage";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";

const UpdatePokemon = (props) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const modal = useSelector((state) => state.modal);
  const pokemon = useSelector((state) => state.pokemonDetail);
  console.log(pokemon);

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    if (types.length === 0) dispatch(getTypes());
    if (Object.keys(pokemon).length === 0)
      dispatch(getPokemonById(props.match.params.id));
  }, [dispatch]);

  //Si entra sin pasar x el detalle
  if (
    Object.keys(pokemon).length > 0 &&
    Object.keys(inputs).length === 0 &&
    Object.keys(types).length !== 0
  ) {
    const typeNames = [];

    for (let i = 0; i < pokemon.types.length; i++) {
      typeNames.push(types.find((t) => t.name === pokemon.types[i].name));
    }

    const ids = typeNames.map((t) => t.id.toString());

    console.log(ids);

    setInputs({
      name: pokemon.name,
      image: pokemon.image,
      height: pokemon.height,
      weight: pokemon.weight,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      types: ids,
    });
  }
  const [errors, setErrors] = useState({});

  const capitalize = (string) =>
    string.charAt(0).toUpperCase().concat(string.slice(1));

  const handleChange = async (event) => {
    const property = event.target.name;
    const value = event.target.value;

    let auxInputs = {};
    let message = "";

    if (property !== "types") {
      auxInputs = { ...inputs, [property]: value.toLowerCase() };
    } else {
      if (!inputs[property]) {
        message = "add";
        auxInputs = { ...inputs, [property]: [value] }; //! Si no tiene la propiedad la crea
      } else if (inputs[property].includes(value)) {
        message = "filter";
        auxInputs = {
          ...inputs,
          [property]: [...inputs[property].filter((obj) => obj !== value)],
        }; //! Si tiene la propiedad y ya incluye el valor lo filtra
      } else {
        message = "add";
        auxInputs = { ...inputs, [property]: [...inputs[property], value] }; //! Si tiene la propiedad y no incluye el valor lo agrega
      }
    }
    setInputs(auxInputs);
    setErrors(validation(property, value, message));
  };

  const validation = (prop, value, message) => {
    let auxErrors = { ...errors };
    switch (prop) {
      case "name":
        if (value.search(/[0-9]/) !== -1)
          return (auxErrors = {
            ...errors,
            [prop]: `${capitalize(prop)} does not admit numbers`,
          });
        if (value.search(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) !== -1)
          return (auxErrors = {
            ...errors,
            [prop]: `${capitalize(prop)} does not admit special characters`,
          });
        if (value.length > 20)
          return (auxErrors = {
            ...errors,
            [prop]: `${capitalize(prop)} must be less than 20 characters`,
          });
        if (value === "")
          return (auxErrors = {
            ...errors,
            [prop]: `${capitalize(prop)} is required`,
          });
        delete auxErrors[prop];
        break;

      case "image":
        if (value !== "" && value.search(/(https?:\/\/.*\.(?:png|jpg))/i) !== 0)
          return (auxErrors = {
            ...errors,
            [prop]: `${capitalize(
              prop
            )} has to be a valid png or jpg image URL`,
          });
        delete auxErrors[prop];
        break;

      case "height":
      case "weight":
      case "hp":
      case "attack":
      case "defense":
      case "speed":
        if (value > 200)
          return (auxErrors = {
            ...errors,
            [prop]: `${capitalize(prop)} cannot be greater than 200`,
          });
        if (!Number.isInteger(Number(value)))
          return (auxErrors = {
            ...errors,
            [prop]: `${capitalize(prop)} must be an integer`,
          });
        if (!value)
          return (auxErrors = {
            ...errors,
            [prop]: `${capitalize(prop)} is required`,
          });
        if (Math.sign(value) < 1)
          return (auxErrors = {
            ...errors,
            [prop]: `${capitalize(prop)} must be a positive number`,
          });
        delete auxErrors[prop];
        break;

      case "types":
        let typesLength = inputs.types.length;
        message === "add" ? typesLength++ : typesLength--;
        if (typesLength === 0)
          return (auxErrors = {
            ...errors,
            [prop]: `Select at least 1 type`,
          });
        if (typesLength > 3)
          return (auxErrors = {
            ...errors,
            [prop]: `Select a maximum of 3 types`,
          });
        delete auxErrors[prop];
        break;

      default:
        return auxErrors;
    }
    return auxErrors;
  };

  const handleClick = async () => {
    alert(await dispatch(putPokemon(pokemon.id, inputs)));
  };

  return Object.keys(pokemon).length !== 0 ? (
    <div className={styles["create-pokemon"]}>
      <Navbar />
      <Modal state={modal} />
      <div className={styles.form}>
        <h1 className={`${styles["form-title"]}`}>Update pokemon</h1>
        <div className={styles["form-section"]}>
          <div className={styles["section-border"]}>
            <label htmlFor="" className={styles["section-title"]}>
              Description
            </label>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              capitalize={capitalize}
              value={inputs.name}
              validationMessage={errors.name}
            />
            <Input
              type="text"
              name="image"
              onChange={handleChange}
              capitalize={capitalize}
              value={inputs.image}
              validationMessage={errors.image}
            />
            <Input
              type="number"
              name="height"
              onChange={handleChange}
              capitalize={capitalize}
              value={inputs.height}
              validationMessage={errors.height}
            />
            <Input
              type="number"
              name="weight"
              onChange={handleChange}
              capitalize={capitalize}
              value={inputs.weight}
              validationMessage={errors.weight}
            />
          </div>
        </div>
        <div className={styles["form-section"]}>
          <div className={styles["section-border"]}>
            <label htmlFor="" className={styles["section-title"]}>
              Stats
            </label>
            <Input
              type="number"
              name="hp"
              onChange={handleChange}
              capitalize={capitalize}
              value={inputs.hp}
              validationMessage={errors.hp}
            />
            <Input
              type="number"
              name="attack"
              onChange={handleChange}
              capitalize={capitalize}
              value={inputs.attack}
              validationMessage={errors.attack}
            />
            <Input
              type="number"
              name="defense"
              onChange={handleChange}
              capitalize={capitalize}
              value={inputs.defense}
              validationMessage={errors.defense}
            />
            <Input
              type="number"
              name="speed"
              onChange={handleChange}
              capitalize={capitalize}
              value={inputs.speed}
              validationMessage={errors.speed}
            />
          </div>
        </div>
        <div className={styles["form-section"]}>
          <div className={`${styles["section-border"]}`}>
            <label htmlFor="" className={`${styles["section-title"]}`}>
              Types
            </label>
            {types?.map((type) => (
              <InputCheck
                name="types"
                element={type}
                onChange={handleChange}
                capitalize={capitalize}
                inputField={inputs.types}
              />
            ))}
            <ValidationMessage message={errors.types} />
          </div>
        </div>
        <div className={styles["form-section"]}>
          <button
            disabled={Object.keys(errors).length > 0}
            onClick={(e) => handleClick(e)}
            className={styles.createBtn}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default UpdatePokemon;
