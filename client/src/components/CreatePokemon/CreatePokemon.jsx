import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, postPokemon } from "../../redux/actions/index";
import styles from "./CreatePokemon.module.css";
import Navbar from "../Navbar/Navbar";

const CreatePokemon = (props) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    types: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    // image: "",
    height: "",
    weight: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    types: "",
  });

  useEffect(() => {
    if (types.length === 0) dispatch(getTypes());
  }, [dispatch]);

  const resetForm = () => {
    setInputs({
      name: "",
      image: "",
      height: "",
      weight: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      types: "",
    });

    setErrors({
      name: "",
      // image: "",
      height: "",
      weight: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      types: "",
    });
  };

  const capitalize = (string) =>
    string.charAt(0).toUpperCase().concat(string.slice(1));

  const changeHandler = async (event) => {
    const property = event.target.name;
    const value = event.target.value;
    let auxInputs = {};
    let message = "";

    if (property === "types") {
      if (!inputs[property]) {
        //? Si no tiene la propiedad la crea
        auxInputs = { ...inputs, [property]: [value] };
        message = "add";
      } else if (inputs[property].includes(value)) {
        //? Si ya incluye lo filtra
        auxInputs = {
          ...inputs,
          [property]: [...inputs[property].filter((obj) => obj !== value)],
        };
        message = "filter";
      } else {
        //? Si tiene la propiedad y no incluye el valor lo agrega
        auxInputs = { ...inputs, [property]: [...inputs[property], value] };
        message = "add";
      }
    } else {
      auxInputs = { ...inputs, [property]: value.toLowerCase() };
    }
    setInputs(auxInputs);
    setErrors(validation(property, auxInputs, message));
  };

  const clickHandler = async () => {
    Object.keys(errors).length > 0
      ? alert("The form has fields not completed")
      : alert(await dispatch(postPokemon(inputs)));
    resetForm();
  };

  const validation = (prop, inp, message) => {
    const value = inp[prop];

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
        // if (value === "")
        //   return (auxErrors = {
        //     ...errors,
        //     [prop]: `${capitalize(prop)} is required`,
        //   });
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
        if (value === "")
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
        break;
    }
    return auxErrors;
  };

  return (
    <div className={styles["create-pokemon"]}>
      <Navbar />
      <div className={styles.form}>
        <h1 className={`${styles["form-title"]}`}>Create pokemon</h1>
        <div className={styles["form-section"]}>
          <div className={styles["section-border"]}>
            <label htmlFor="" className={styles["section-title"]}>
              Description
            </label>
            <div className={styles["input-box"]}>
              <input
                value={inputs["name"]}
                type="text"
                className={styles.name}
                name="name"
                required="required"
                onChange={changeHandler}
              />
              <span className={styles["placeholder"]}>Name</span>
              {errors.name && (
                <span className={styles["validation-message"]}>
                  &middot; {errors.name}
                </span>
              )}
            </div>
            <div className={styles["input-box"]}>
              <input
                value={inputs.image}
                type="text"
                className={styles.image}
                name="image"
                required="required"
                onChange={(e) => changeHandler(e)}
              />
              <span className={styles["placeholder"]}>Image URL</span>
              {errors.image && (
                <span className={styles["validation-message"]}>
                  &middot; {errors.image}
                </span>
              )}
            </div>
            <div className={styles["input-box"]}>
              <input
                value={inputs.height}
                type="number"
                name="height"
                required="required"
                onChange={(e) => changeHandler(e)}
              />
              <span className={styles["placeholder"]}>Height</span>
              {errors.height && (
                <span className={styles["validation-message"]}>
                  &middot; {errors.height}
                </span>
              )}
            </div>
            <div className={styles["input-box"]}>
              <input
                value={inputs.weight}
                type="number"
                name="weight"
                required="required"
                onChange={(e) => changeHandler(e)}
              />
              <span className={styles["placeholder"]}>Weight</span>
              {errors.weight && (
                <span className={styles["validation-message"]}>
                  &middot; {errors.weight}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={styles["form-section"]}>
          <div className={styles["section-border"]}>
            <label htmlFor="" className={styles["section-title"]}>
              Stats
            </label>
            <div className={styles["input-box"]}>
              <input
                value={inputs.hp}
                type="number"
                name="hp"
                required="required"
                onChange={(e) => changeHandler(e)}
              />
              <span className={styles["placeholder"]}>HP</span>
              {errors.hp && (
                <span className={styles["validation-message"]}>
                  &middot; {errors.hp}
                </span>
              )}
            </div>
            <div className={styles["input-box"]}>
              <input
                value={inputs.attack}
                type="number"
                name="attack"
                required="required"
                onChange={(e) => changeHandler(e)}
              />
              <span className={styles["placeholder"]}>Attack</span>
              {errors.attack && (
                <span className={styles["validation-message"]}>
                  &middot; {errors.attack}
                </span>
              )}
            </div>
            <div className={styles["input-box"]}>
              <input
                value={inputs.defense}
                type="number"
                name="defense"
                required="required"
                onChange={(e) => changeHandler(e)}
              />
              <span className={styles["placeholder"]}>Defense</span>
              {errors.defense && (
                <span className={styles["validation-message"]}>
                  &middot; {errors.defense}
                </span>
              )}
            </div>
            <div className={styles["input-box"]}>
              <input
                value={inputs.speed}
                type="number"
                name="speed"
                required="required"
                onChange={(e) => changeHandler(e)}
              />
              <span className={styles["placeholder"]}>Speed</span>
              {errors.speed && (
                <span className={styles["validation-message"]}>
                  &middot; {errors.speed}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={styles["form-section"]}>
          <div
            className={`${styles.checksContainer} ${styles["section-border"]}`}
          >
            <label htmlFor="" className={`${styles["section-title"]}`}>
              Types
            </label>
            {types?.map((type) => (
              <div>
                <input
                  className={styles.check}
                  onChange={(e) => changeHandler(e)}
                  type="checkbox"
                  name="types"
                  id={type.id}
                  value={type.id}
                  checked={
                    inputs.types === ""
                      ? false
                      : inputs.types.filter((t) => t == type.id).length > 0
                  }
                />
                <label className={styles.check} htmlFor={type.id}>
                  {capitalize(type.name)}
                </label>
              </div>
            ))}
            <div className={styles["w-100"]}>
              {errors.types && (
                <span className={styles["validation-message"]}>
                  &middot; {errors.types}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={styles["form-section"]}>
          <button
            disabled={Object.keys(errors).length > 0}
            onClick={(e) => clickHandler(e)}
            className={styles.createBtn}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePokemon;
