import type { Pokemon, PokemonType } from 'pokenode-ts'
import { useState } from 'react'
import HeartCheckbox from './HeartCheckbox';
import { capsNoHyphen } from './utils';

const typeColors: Record<string, string> = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

function getBgColour(types: PokemonType[]) {
    if (types.length == 1) {
        return typeColors[types[0].type.name];
    } else if (types.length == 2) {
        return "linear-gradient(to right bottom, " + typeColors[types[0].type.name] + " 50%, " + typeColors[types[1].type.name] + " 50%";
    } else {
        return "";
    }
}


type PokemonCardProps = {
    pokemon: Pokemon;
    searchFilter: string;
    favMode: boolean;
    setDetail: (detail: boolean) => void;
    setPokemon: (pkmn: Pokemon|null) => void;
    detail: boolean;
};

function PokemonCard({ pokemon, searchFilter, favMode, setDetail, setPokemon, detail }: PokemonCardProps) {
    const [fav, setFav] = useState(false)

    const types = pokemon["types"];
    let typeHTML = <p className='text-xl m-2'>{capsNoHyphen(types[0].type.name)}</p>
    if (types.length > 1) {
        typeHTML = <p className='text-xl m-2'>{capsNoHyphen(types[0].type.name)}/{capsNoHyphen(types[1].type.name)}</p>
    }
    if (pokemon["name"].includes(searchFilter) && (!favMode || fav)) {
        return (
            <>
                <div className="grow text-black">
                    <div className="flex-none flex-col flex m-1 items-center justify-center rounded-md" style={{ background: getBgColour(types) }}>
                        <div className='basis-full flex-none flex-row'>
                            <h1 className="object-left">{pokemon["id"]}</h1>
                            <HeartCheckbox id={'box'} label={'Favorite'} setFavourite={setFav} />
                            
                        </div>
                        <p className='text-2xl font-bold'>
                            {capsNoHyphen(pokemon["name"])}
                        </p>
                        <img src={pokemon.sprites.front_default as string} onClick={() => {setDetail(!detail); setPokemon(pokemon)}} className="size-64 flex-shrink-0 m-4" alt="React logo" />
                        {typeHTML}
                    </div>
                </div>
            </>
        );
    }
}

export default PokemonCard