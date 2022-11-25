import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getPokemonByName,
  alphabeticOrder,
  originFilter,
  statsOrder,
  toggleModal,
  toggleLoader,
  rechargeAllPokemons,
} from "../../redux/actions/index";
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginated from "../Paginated/Paginated";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

const Home = (props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.allPokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const LastPokemon = currentPage * 12;
  const FirstPokemon = LastPokemon - 12;
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPokemons = filteredPokemons.slice(FirstPokemon, LastPokemon);
  const [inputs, setInputs] = useState({});
  const modal = useSelector((state) => state.modal);
  const loader = useSelector((state) => state.loader);

  const showModalComponent = (message, btnOK, btnOKAction) => {
    if (!modal) dispatch(toggleModal());
    return (
      <Modal
        status={modal}
        message={message}
        btnOK={btnOK}
        btnOKAction={btnOKAction}
      />
    );
  };

  const paginated = (page) => {
    setCurrentPage(page);
  };

  const refresh = () => {
    dispatch(toggleLoader());
    dispatch(getPokemons());
  };

  useEffect(() => {
    if (pokemons.length === 0) dispatch(getPokemons());
    return () => {
      if (modal) dispatch(toggleModal());
    };
  }, [dispatch]);

  const changeHandler = async (event) => {
    const property = event.target.name;
    const value = event.target.value;

    switch (property) {
      case "name":
        setInputs({ ...inputs, [property]: value });
        break;

      case "alphabetic_order":
        setInputs({ [property]: value });
        dispatch(alphabeticOrder(value));
        break;

      case "origin_filter":
        setCurrentPage(1);
        setInputs({ [property]: value });
        dispatch(originFilter(value));
        break;

      case "stat_order":
        setInputs({ [property]: value });
        dispatch(statsOrder(value));
        break;

      default:
        break;
    }
  };

  const clickHandler = async () => {
    setCurrentPage(1);
    setInputs({ name: "" });
    await dispatch(getPokemonByName(inputs.name));
  };

  return (
    <>
      <Navbar />
      <div className={styles.home}>
        <div className={styles.container}>
          <div
            className={`${styles.filters} ${
              loader ? styles.disabled : styles.enabled
            }`}
          >
            <div>
              <button onClick={() => refresh()}>Refresh</button>
            </div>
            <div>
              <input
                onChange={(e) => changeHandler(e)}
                type="text"
                placeholder="Search by name"
                name="name"
                value={inputs.name}
              />
              <button onClick={(e) => clickHandler(e)}>Search</button>
            </div>
            <div id="pkmByOrigin">
              <select
                name="origin_filter"
                id=""
                onChange={(e) => changeHandler(e)}
              >
                <option
                  hidden
                  label="Select origin"
                  selected={Object.keys(inputs).length === 0}
                ></option>
                <option value="all">All pokemons</option>
                <option value="api">API pokemons</option>
                <option value="db">Database pokemons</option>
              </select>
            </div>
            <div id="alphabeticOrder">
              <select
                onChange={(e) => changeHandler(e)}
                name="alphabetic_order"
                value={inputs.alphabetic_order}
              >
                <option
                  hidden
                  label="Select order"
                  selected={
                    Object.keys(inputs).length === 0 ||
                    inputs.alphabetic_order === undefined
                  }
                ></option>
                <option value="a_z">A-Z</option>
                <option value="z_a">Z-A</option>
              </select>
            </div>
            <div id="attackOrder">
              <select
                name="stat_order"
                id=""
                onChange={(e) => changeHandler(e)}
              >
                <option
                  hidden
                  label="Select stat"
                  selected={
                    Object.keys(inputs).length === 0 ||
                    inputs.stat_order === undefined
                  }
                ></option>
                <option value="max_attack">Max attack</option>
                <option value="min_attack">Min attack</option>
              </select>
            </div>
          </div>
          {console.log({ filteredPokemons })}
          {loader === false ? (
            filteredPokemons[0].hasOwnProperty("error") ? (
              filteredPokemons[0].code === 408 ? (
                showModalComponent(filteredPokemons[0].error, true, () => {
                  refresh();
                })
              ) : (
                showModalComponent(filteredPokemons[0].error, true, () => {
                  dispatch(rechargeAllPokemons());
                  dispatch(toggleModal());
                })
              )
            ) : (
              <div className={styles.pokemons}>
                {console.log(filteredPokemons)}
                <Paginated
                  key="paginated1"
                  array={filteredPokemons}
                  paginated={paginated}
                  name="paginado1"
                  currentPage={currentPage}
                />
                {currentPokemons?.map((pokemon) => {
                  return (
                    <PokemonCard
                      key={pokemon.id}
                      id={pokemon.id}
                      name={pokemon.name}
                      image={pokemon.image}
                      types={pokemon.types}
                      mainType={
                        pokemon.types[0].hasOwnProperty("name")
                          ? pokemon.types[0].name
                          : pokemon.types[0]
                      }
                    />
                  );
                })}
                <Paginated
                  key="paginated2"
                  array={filteredPokemons}
                  paginated={paginated}
                  name="paginado2"
                  currentPage={currentPage}
                />
              </div>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
