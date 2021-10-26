import { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import CustomNavbar from './components/CustomNavbar';
import CustomCard from './components/CustomCard';
import CustomSearch from './components/CustomSearch';
import CustomAlert from './components/CustomAlert';

import './App.css';

function App() {
  const [cacheSearch, setCacheSearch, removeCacheSearch] = useLocalStorage('pokemonSearch', []);

  const [pokemon, setPokemon] = useState({});
  const [searchPokemon, setSearchPokemon] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => { handleFindPokemon(); }, []);
  useEffect(() => { saveInCache(); }, [pokemon]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    }
  }, [open]);

  async function handleRequestAPI() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase() || 'pikachu'}`);
      const { name, sprites: { other }, abilities } = await response.json();
      const { dream_world: { front_default } } = other;

      const currentPokemon = {
        name,
        abilities,
        image: front_default
      }

      setPokemon(currentPokemon);
    } catch (error) {
      setOpen(true);
    }
  }

  async function handleFindPokemon() {
    const result = checkInCache();

    if (result) {
      return setPokemon(result);
    }

    await handleRequestAPI();
  }

  function saveInCache() {
    if (!cacheSearch.find(item => item.name === pokemon.name)) {
      setCacheSearch([...cacheSearch, pokemon]);
    }
  }

  function checkInCache() {
    if (searchPokemon) {
      return cacheSearch.find(item => item.name === searchPokemon);
    }

    return cacheSearch.find(item => item.name === 'pikachu');
  }

  return (
    <div className="App">
      <CustomNavbar></CustomNavbar>
      <div className="container">
        <CustomCard pokemon={pokemon}></CustomCard>
        <CustomSearch
          searchPokemon={searchPokemon}
          setSearchPokemon={setSearchPokemon}
          handleFindPokemon={handleFindPokemon}
        >
        </CustomSearch>
      </div>
      {open && <CustomAlert></CustomAlert>}
    </div>
  );
}

export default App;