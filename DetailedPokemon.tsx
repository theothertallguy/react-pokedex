import { MoveClient, type Pokemon, type PokemonMove } from "pokenode-ts"
import { useEffect, useState } from "react";
import { capsNoHyphen } from './utils';
"use client"


type DetailedPokemonProps = {
    pokemonData: Pokemon;
    closePopup: (opened: boolean) => void;
    setDetail: (detail: boolean) => void;
    setPokemon: (pkmn: Pokemon | null) => void;
}

type moveData = {
    name: string;
    type: string;
    level: number;
}

function checkMoveGen1(move: PokemonMove) {
    const vgd = move.version_group_details;
    const hasRB = vgd.map((group) => group.level_learned_at > 0 && group.move_learn_method.name == "level-up" && group.version_group.name == "red-blue");
    return hasRB.reduce((memo, val) => memo || val);
}

async function allMovesLevelUp(pokemon: Pokemon) {
    const movesList = pokemon.moves;
    const moves = movesList.filter((move) => checkMoveGen1(move));
    const genOneMoves = await Promise.all(
        moves.map((move) =>
            getVGD(move) // optional: skip failed ones
        )
    );
    genOneMoves.sort((a, b) => a.level - b.level);
    return genOneMoves;
}

async function getVGD(move: PokemonMove) {
    const vgd = move.version_group_details.find((group) => group.level_learned_at > 0 && group.move_learn_method.name == "level-up" && group.version_group.name == "red-blue");
    if (vgd != undefined) {
        const moveClient = new MoveClient();
        const moveName = move.move.name;
        const moveType = (await moveClient.getMoveByName(move.move.name)).type.name;
        const moveLevel = vgd.level_learned_at
        const data: moveData = {
            name: moveName,
            type: moveType,
            level: moveLevel
        };
        return data;
    } else {
        throw new Error("Error not thought out, sorry mate.");
    }
}

function DetailedPokemon({ pokemonData, closePopup }: DetailedPokemonProps) {
    const [moveData, setMoveData] = useState<moveData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await allMovesLevelUp(pokemonData);
            setMoveData(data);
        }
        fetchData();
    }, [pokemonData]);

    return (
        <div className="fixed flex flex-col inset-0 bg-black-blur m-auto items-center">
            <div className="bg-black m-2 sm:m-4 p-4 flex flex-col overflow-y-auto">
                <button onClick={() => closePopup(false)}>Close Detailed View</button>
                <div className="flex-col md:flex-row flex items-center mt-4 mb-4 md:mb-0">
                    <div className="flex-cols">
                        <div className="text-2xl font-semibold">{capsNoHyphen(pokemonData.name)}</div>
                        <img src={pokemonData.sprites.front_default as string} className="size-32 sm:size-64 flex-shrink-0 mx-4" alt="React logo" />
                    </div>
                    <div className="grid grid-cols-2">
                        
                    <p className="border-1">Stat</p><p className="border-1">Base Value</p>
                    <div className="border-1">
                        {
                            pokemonData.stats.map((stat) =>
                                <div>
                                    {capsNoHyphen(stat.stat.name)}
                                </div>)
                        }

                    </div>
                    <div className="border-1">
                        {
                            pokemonData.stats.map((stat) =>
                                <div>
                                    {stat.base_stat}
                                </div>)
                        }
                        
                    </div>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <p className="border-1">Level Learned</p><p className="border-1">Type</p><p className="border-1">Move Name</p>
                    <div className="border-1">
                        {
                            moveData.map((move) => {
                                return (
                                    <div>
                                        <p>{move.level}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="border-1">
                        {
                            moveData.map((move) => {
                                return (
                                    <div>
                                        <p>{capsNoHyphen(move.type)}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="border-1">
                        {
                            moveData.map((move) => {
                                return (
                                    <div>
                                        <p>{capsNoHyphen(move.name)}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailedPokemon
