import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getPokemonByName,
  alphabeticOrder,
  originFilter,
  rechargeAllPokemons,
  statsOrder,
} from "../../redux/actions/index";
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginated from "../Paginated/Paginated";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";

const Home = (props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.allPokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputs, setInputs] = useState({});
  const LastPokemon = currentPage * 12;
  const FirstPokemon = LastPokemon - 12;
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPokemons = filteredPokemons.slice(FirstPokemon, LastPokemon);
  //? COMPONENTE MODAL
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  //   const handleOpen = () => {
  //     setModalIsOpen(true);
  //   };

  //   const handleClose = () => {
  //     setModalIsOpen(false);
  //   };

  const paginated = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (pokemons.length === 0) dispatch(getPokemons());
  }, [dispatch]);

  const recharge = () => {
    dispatch(getPokemons());
  };

  const ordenar = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const changeHandler = async (event) => {
    const property = event.target.name;
    const value = event.target.value;

    switch (event.target.name) {
      case "name":
        setInputs({ ...inputs, [property]: value });
        console.log(inputs);
        break;

      case "alphabetic_order":
        ordenar(event.target.name, event.target.value);
        dispatch(alphabeticOrder(event.target.value));
        break;

      case "origin_filter":
        ordenar(event.target.name, event.target.value);
        dispatch(originFilter(event.target.value));
        break;

      case "stat_order":
        ordenar(event.target.name, event.target.value);
        dispatch(statsOrder(event.target.value));
        break;

      default:
        break;
    }
  };

  const clickHandler = async (event) => {
    if (inputs.name) {
      await dispatch(getPokemonByName(inputs.name));
      setInputs({ ...inputs, ["name"]: "" });
    } else {
      alert("Name empty");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.home}>
        {filteredPokemons.length ? (
          <div className={styles.container}>
            <div className={styles.filters}>
              <div>
                <button onClick={() => recharge()}>Recharge</button>
              </div>
              <div id="pkmByName">
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
                  <option hidden label="Select origin" value="-1"></option>
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
                  <option hidden label="Select order" value="-1"></option>
                  <option value="indistinct">Indistinct</option>
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
                  <option hidden label="Select stat" value="-1"></option>
                  <option value="indistinct">Indistinct</option>
                  <option value="max_attack">Max attack</option>
                  <option value="min_attack">Min attack</option>
                </select>
              </div>
            </div>
            <div className={styles.pokemons}>
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
          </div>
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.pokeball}></div>
            <span className={styles.loadingText}>Loading...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
