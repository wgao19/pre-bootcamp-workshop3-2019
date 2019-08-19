/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.css";

import Header from "./components/Header";
import List from "./components/List";
import Input from "./components/Input";
import Pokemon from "./components/Pokemon";
import PokemonContext from "./components/PokemonContext";
import Pokedex from "./components/Pokedex";

function useFetchPokemons() {
  const [offset, setOffset] = React.useState(0);
  const [pokemons, setPokemons] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=10`
      );
      const { results } = await response.json();
      const newPokemons = results.map(pokemon => pokemon);
      setPokemons(pokemons.concat(newPokemons));
      setLoading(false);
    };

    fetchPokemon();
  }, [offset]);

  const loadMore = React.useCallback(
    (limit = 10) => {
      setOffset(offset + limit);
    },
    [offset]
  );
  return { pokemons, loading, loadMore };
}

function App() {
  const [value, setValue] = React.useState("I'm MR. input");
  const { pokemons, loading, loadMore } = useFetchPokemons();
  const [selectedPokemon, setSelectedPokemon] = React.useState();
  return (
    <PokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
      <div className="App">
        <Header />
        <Input value={value} setValue={setValue} />
        <Pokedex
          main={<List items={pokemons} loading={loading} loadMore={loadMore} />}
          right={selectedPokemon && <Pokemon name={selectedPokemon} />}
        />
      </div>
    </PokemonContext.Provider>
  );
}

export default App;