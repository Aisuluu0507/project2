import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

const CardsListPokemon = ({ name, url }) => {
  const [Data, setData] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }, [url]);

  return (
    <div className="cards">
      <h2>{name}</h2>
      {Data && (
        <>
          <img src={Data.sprites.front_default} alt={name} />
          <p>Height: {Data.height}</p>
          <p>Weight: {Data.weight}</p>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [List, setList] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/')
      .then(response => {
        setList(response.data.results);
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Pokemon</h1>
      <div className="containerListPokemon">
        {List.map(pokemon => (
          <CardsListPokemon key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
};

export default App;
