import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GameClient } from 'pokenode-ts'; // import the GameClient


class pokemonData {
  dexno: number;
  name: string;
  type1: string;
  type2: string;
  moves: string[];
  bst: number[];
  favorite: boolean;

  constructor(d:number,n:string,t1:string,t2:string,m:string[],b:number[]) {
    this.dexno = d;
    this.name = n;
    this.type1 = t1;
    this.type2 = t2;
    this.moves = m;
    this.bst = b;
    this.favorite = false;
  }
}

type DexDictionary = {
        [key: number]: pokemonData; // Keys are strings, values are strings
    }

function App() {
  const [count, setCount] = useState(0)
  const [pokemon, setPokemon] = useState([])
  

  const getGen = async () => {
    const genURL = "https://pokeapi.co/api/v2/generation/1/";
    const response = await fetch(genURL);
    const body = await response.json()
    const pokemon = body["pokemon_species"]
    setPokemon(pokemon);
    getPokemon();
  }

  const getPokemon = async () => {
    const data: DexDictionary = {};
    try {
      const datae = pokemon.map(async (pkmnName) => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pkmnName)
      });

      const pokeItems = await Promise.all(datae);

    } catch (err) {

    } finally {

    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test oHhiMaRk
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={getGen}>pokemon</button>
      {
        pokemon.map((poke)=> {
          return (
            <div>
              <h3>
                {poke["name"]}
              </h3>
            </div>
          )
        })
      }
      
  <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>

    </>
  )
}

export default App
