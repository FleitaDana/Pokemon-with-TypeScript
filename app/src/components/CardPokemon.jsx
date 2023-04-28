import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, CardHeader, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import img from '../assets/notFound.png';

const CardPokemon = (props) => {

    const [stats, setStats] = useState([]);
    const [ability, setAbility] = useState([]);
    const [totalEvolutionsMedia, setTotalEvolutionsMedia] = useState([]);
    const [totalEvolutionsFinal, setTotalEvolutionsFinal] = useState([]);

    const evo = true;

    // function saveData (event) {
    //  console.log("ESTOY EN SAVE DATA")
    // localStorage.setItem('evoMedia', true)
    // console.log("ESTOY EN SAVE DATA")
    // console.log(localStorage.setItem('evoMedia'))
    // }


    function click() {
        localStorage.setItem('evoMedia', evo)
    }

    useEffect(() => {
        setStats(props.pokemonStats)
    }, [props.pokemonStats])

    useEffect(() => {
        setAbility(props.pokemonAbilities)
    }, [props.pokemonAbilities])

    useEffect(() => {
        setTotalEvolutionsMedia(props.totalEvolutionsMedia);
        //console.log(props.totalEvolutionsMedia)

    }, [props.totalEvolutionsMedia])

    useEffect(() => {
        setTotalEvolutionsFinal(props.totalEvolutionsFinal);
        //console.log("totalEvolutionsFinal de la card", props.totalEvolutionsFinal)
    }, [props.totalEvolutionsFinal])

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
                            title={props.pokemon.id}
                        />
                        <CardMedia sx={{ height: 300 }}
                            component="img"
                            image={props.pokemonImage || img}
                            alt="Foto Pokemon"
                        />

                        <CardContent m='4' sx={{ fontStyle: 'oblique' }}>

                            <Typography gutterBottom variant="h4" component="div" align='center'>
                                {props.pokemonName.charAt(0).toUpperCase() + props.pokemonName.slice(1)}

                            </Typography>

                            <Typography variant="h6" color="text.primary" align='center'>
                                Weight: <Typography variant="body2">{props.pokemonWeight} kg</Typography>
                            </Typography>

                            <Typography variant="h6" color="text.primary" align='center'>
                                Height: <Typography variant="body2">{props.pokemonHeight} cm</Typography>
                            </Typography>

                            <Typography variant="h6" color="text.primary" align='center'>
                                Base evolution:
                            </Typography>

                            {props.pokemonEvolutionOne.length === 0 ? (
                                <Typography color="text.primary" variant="body2" align='center'>Does not have</Typography>
                            ) : (
                                <Typography variant="h6" color="text.primary" align='center'>
                                    <Link onClick={click} underline='none' href={`/SeeDetails/${props.pokemonEvolutionOne}`}>
                                        <Typography color="text.primary" variant="body2">{props.pokemonEvolutionOne} <ArrowOutwardIcon sx={{ fontSize: 'small' }} color="secondary" /></Typography>
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
                            )}

                            {/* 
                            {props.pokemonEvolutionOne.length === 0 && totalEvolutionsMedia.length === 0 && totalEvolutionsFinal.length === 0? (
                            <Typography variant="h6" color="text.primary" align='center'>
                            DOES NOT HAVE EVOLUTIONSSS
                            <br />
                        </Typography>):(

                            
                            <Typography variant="h6" color="text.primary" align='center'>
                            DOES NOT HAVE EVOLUTIONS
                            <br />
                        </Typography>
                        )} */}


                            <Typography variant="h6" color="text.primary" align='center'>
                                Special-stats:
                                <br />
                            </Typography>

                            <Typography variant="body2" color="text.primary" align='center'>
                                {stats?.map(st => (
                                    <Typography variant="body2" color="text.primary" align='center'>{st.stat.name}: {st.base_stat}</Typography>)
                                )}
                            </Typography>

                            <Typography variant="h6" color="text.primary" align='center'>
                                Abilities:
                                <br />
                            </Typography>

                            <Typography variant="body2" color="text.primary" align='center'>
                                {ability?.map(ability =>
                                    <Typography variant="body2" color="text.primary" align='center'>{ability.ability.name}</Typography>)}
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