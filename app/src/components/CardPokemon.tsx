import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, CardHeader, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
//import img from '../assets/notFound.png';

interface Props {
    pokemon: Pokemon,
    //pokemonStats: Array<Stats>,
    //pokemonAbilities: Array<Ability>,
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
    name: string,
    base_stat: number,
}

interface Ability {
    ability: { name: string },
}

interface TotalEvolutionsMedia {
    evolution: string,
}

interface TotalEvolutionsFinal {
    evolution: string,
}

const img = "../assets/notFound.png"

const CardPokemon = ({ pokemon } : Props) => {

    const [stats, setStats] = useState<Array<Stats>>([]);
    const [ability, setAbility] = useState<Array<Ability>>([]);
    const [totalEvolutionsMedia, setTotalEvolutionsMedia] = useState<Array<String>>([]);
    const [totalEvolutionsFinal, setTotalEvolutionsFinal] = useState<Array<String>>([]);

    const evo = true;

    function click() {
        localStorage.setItem('evoMedia', String(evo))
    }
    
 console.log(pokemon);
    // useEffect(() => {
    //     setStats(pokemonStats)
    // }, [pokemonStats])

    // useEffect(() => {
    //     setAbility(pokemonAbilities)
    // }, [pokemonAbilities])

    // useEffect(() => {
    //     setTotalEvolutionsMedia(evolutionsMedia);
    // }, [evolutionsMedia])

    // useEffect(() => {
    //     setTotalEvolutionsFinal(evolutionsFinal);
    // }, [evolutionsFinal])

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

                <Card sx={{ transition: "0.2s", "&:hover": { transform: "scale(1.05)" }, display: 'flex', alignContent: 'center', justifyContent: 'center', boxShadow: 10, border: 2 }}>
                    <CardActionArea>

                        <CardHeader sx={{ color: 'grey' }}
                            title={pokemon.id}
                        />
                        <CardMedia sx={{ height: 300 }}
                            component="img"
                            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png` || img}
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

                            {/*<Typography variant="h6" color="text.primary" align='center'>
                                Base evolution:
                            </Typography>

                             {pokemonEvolutionOne.length === 0 ? (
                                <Typography color="text.primary" variant="body2" align='center'>Does not have</Typography>
                            ) : (
                                <Typography variant="h6" color="text.primary" align='center'>
                                    <Link onClick={click} underline='none' href={`/SeeDetails/${pokemonEvolutionOne}`}>
                                        <Typography color="text.primary" variant="body2">{pokemonEvolutionOne} <ArrowOutwardIcon sx={{ fontSize: 'small' }} color="secondary" /></Typography>
                                    </Link>
                                </Typography>
                            )}

                            <Typography variant="h6" color="text.primary" align='center'>
                                First evolution:
                                <br />
                            </Typography>

                            {totalEvolutionsMedia.length === 0 ? (
                                <Typography color="text.primary" variant="body2" align='center'>Does not have</Typography>
                            ) : (
                                <Typography variant="body2" color="text.primary" align='center'>
                                    {totalEvolutionsMedia?.map((media) => (
                                        <Link onClick={click} underline='none' href={`/SeeDetails/${media}`} >
                                          <Typography color="text.primary" variant="body2" align='center'>{media}<ArrowOutwardIcon sx={{ fontSize: 'small' }} color="secondary" /></Typography> 
                                        </Link>
                                    ))}
                                </Typography>
                            )}

                            <Typography variant="h6" color="text.primary" align='center'>
                                Second evolution:
                                <br />
                            </Typography>

                            {totalEvolutionsFinal.length === 0 ? (
                                <Typography color="text.primary" variant="body2" align='center'>Does not have</Typography>
                            ) : (
                                <Typography variant="body2" color="text.primary" align='center'>
                                    {totalEvolutionsFinal?.map(final => (
                                        <Link onClick={click} underline='none' href={`/SeeDetails/${final}`}>
                                             <Typography color="text.primary" variant="body2" align='center'>{final}<ArrowOutwardIcon sx={{ fontSize: 'small' }} color="secondary" /></Typography> 
                                        </Link>
                                    ))}
                                </Typography>
                            )} */}

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