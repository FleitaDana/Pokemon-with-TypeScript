import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, CardHeader, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import notPokemonImg from '../assets/notPokemon';

interface Props {
    pokemon: Pokemon,
    //pokemonStats: Array<Stats>,
    //pokemonAbilities: Array<Ability>,
    pokemonEvolutions: Array<Evolution>,
}

interface Pokemon {
    id: number,
    name: string,
    height: number,
    weight: number,
    abilities: Array<Ability>,
    stats: Array<Stats>,
}

interface Stats {
    dato: { name: string },
    base_stat: number,
}

interface Ability {
    ability: { name: string },
}

interface Evolution {
    name: string,
}

// interface TotalEvolutionsMedia {
//     evolution: string,
// }

// interface TotalEvolutionsFinal {
//     evolution: string,
// }

const img = "../assets/notFound.png"

const CardPokemon = ({ pokemon, pokemonEvolutions }: Props) => {

    // const [stats, setStats] = useState<Array<Stats>>([]);
    // const [ability, setAbility] = useState<Array<Ability>>([]);
    // const [totalEvolutionsMedia, setTotalEvolutionsMedia] = useState<Array<String>>([]);
    // const [totalEvolutionsFinal, setTotalEvolutionsFinal] = useState<Array<String>>([]);

    const evo = true;

    function click() {
        localStorage.setItem('evoMedia', String(evo))
    }

    //console.log(pokemonEvolutions);

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <Grid item
                justifyContent="center"
                alignItems="center"
                xs={12} md={12} lg={12}
                sx={{ margin: 3 }}>

                <Card sx={{ transition: "0.2s", "&:hover": { transform: "scale(1.05)" }, display: 'flex', alignContent: 'center', justifyContent: 'center', boxShadow: 10, border: 2, widht:'100px' }}>
                    <CardActionArea>

                        <CardHeader sx={{ color: 'grey' }}
                            title={pokemon.id}
                        />
                        <CardMedia sx={{ height: 300 }}
                            component="img"
                            image={pokemon.id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png` : notPokemonImg}
                            alt="Foto Pokemon"
                        />

                        <CardContent sx={{ fontStyle: 'oblique' }}> {/* SAQUE m=4 */}

                            <Typography gutterBottom variant="h4" component="div" align='center'>
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}

                            </Typography>

                            <Typography variant="h6" color="text.primary" align='center'>
                                Weight: <Typography variant="body2">{pokemon.weight} kg</Typography>
                            </Typography>

                            <Typography variant="h6" color="text.primary" align='center'>
                                Height: <Typography variant="body2">{pokemon.height} cm</Typography>
                            </Typography>

                            {pokemonEvolutions.length === 0 ? (
                                <Typography color="text.primary" variant="body2" align='center'>This pokemon has no evolutions</Typography>
                            ) : (
                                <>
                                    <Typography variant="h6" color="text.primary" align='center'>
                                        Evolutionary chain:
                                        <br />
                                    </Typography>

                                    <Typography variant="body2" color="text.primary" align='center'>
                                        {pokemonEvolutions?.map((evolution: any) => (
                                            <Link onClick={click} underline='none' href={`/SeeDetails/${evolution}`} >
                                                <Typography color="text.primary" variant="body2" align='center'>{evolution}<ArrowOutwardIcon sx={{ fontSize: 'small' }} color="secondary" /></Typography>
                                            </Link>
                                        ))}
                                    </Typography>
                                </>
                            )}


                            <Typography variant="h6" color="text.primary" align='center'>
                                Special-stats:
                                <br />
                            </Typography>

                            <Typography variant="body2" color="text.primary" align='center'>
                                {pokemon.stats?.map(st => (
                                    <Typography variant="body2" color="text.primary" align='center'>{st.dato.name}: {st.base_stat}</Typography>)
                                )}
                            </Typography>

                            <Typography variant="h6" color="text.primary" align='center'>
                                Abilities:
                                <br />
                            </Typography>

                            <Typography variant="body2" color="text.primary" align='center'>
                                {pokemon.abilities?.map(ab => (
                                    <Typography variant="body2" color="text.primary" align='center'>{ab.ability.name}</Typography>)
                                )}
                                <br></br>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid >
    )
}
export default CardPokemon;