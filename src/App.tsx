import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import PokemonCard from './PokemonCard'
import { GameClient, type NamedAPIResource, type Pokemon, PokemonClient } from 'pokenode-ts'; // import the GameClient
import DetailedPokemon from './DetailedPokemon';


function App() {
  const [, setPokemonNames] = useState<NamedAPIResource[]>([])
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [filter, setFilter] = useState("")
  const [favourite, setFavourite] = useState(false)
  const [detailPokemon, setDetailPokemon] = useState<Pokemon | null>(null)
  const [detail, setDetail] = useState(false)

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const api = new GameClient(); // create a GameClient
    const pokeapi = new PokemonClient();
    const gen = await api.getGenerationById(1);
    setPokemonNames(gen.pokemon_species)
    const responses = await Promise.all(gen.pokemon_species.map(async (pkmn) => {
      console.log(pkmn["name"])
      return pokeapi.getPokemonByName(pkmn["name"]); //.catch((error) => {console.error(error); return null;});
    }));
    const lst: Pokemon[] = responses;
    setPokemon(lst.sort((a, b) => a["id"] - b["id"]));
  }

  return (
    <>
      <section className='w-full left-0 flex flex-cols bg-black'>
        <div className='w-full left-0 flex justify-center items-center gap-8 bg-black text-white py-4'>
          <button onClick={() => setFavourite(!favourite)}>
            View {favourite ? "All" : "Favourite"} Pokemon
          </button>
          <div className="flex items-center gap-2">
            <label htmlFor="search">Search for a Pokemon by name:</label>
            <input
              id="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-4 rounded px-2 py-1 bg-black text-white"
            />
          </div>
        </div>


      </section>
      <section className="m-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {
          pokemon.map((poke) => {
            return <PokemonCard pokemon={poke} searchFilter={filter} favMode={favourite} setDetail={setDetail} detail={detail} setPokemon={setDetailPokemon} />;
          })
        }
      </section>
      <>
        {detail && detailPokemon != null && (
          <DetailedPokemon pokemonData={detailPokemon} closePopup={setDetail} setDetail={setDetail} setPokemon={setDetailPokemon} />
        )}
      </>
    </>
  )
}

export default App
