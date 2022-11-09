import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import About from "./components/About/About";
import Page404 from "./components/Page404/Page404";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/pokemons/:id" component={PokemonDetail} />
        <Route exact path="/createPokemon" component={CreatePokemon} />
        <Route exact path="/about" component={About} />
        <Route component={Page404} />
      </Switch>
    </>
  );
}

export default App;
