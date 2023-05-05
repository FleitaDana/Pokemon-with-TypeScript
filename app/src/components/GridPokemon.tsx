import React from 'react'
import { Box, Grid, Typography, Link } from '@mui/material';


interface Props{
 listPokemon: Array<Pokemon>,
 pokemonImage: string,
}

interface Pokemon{
    name: string,
}

const GridPokemon = ({listPokemon, pokemonImage}: Props) => {

    console.log(pokemonImage)

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="100%"
            margin={0}
        >
            {listPokemon.map((pokemon, index) => {
                console.log(index)
                const imagen = pokemonImage[index];
                console.log(pokemonImage[index])
                return (
                    <Grid
                        item
                        key={index}
                        justifyContent="center"
                        alignItems="center"
                        xs={10}
                        md={5}
                        lg={3}
                        sx={{ backgroundColor: '#FFFFFF' }}
                        margin={2}
                        paddingTop={'10px'}
                    >
                        <Typography align='center'>{pokemon.name}</Typography>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                width="150px"
                                src={imagen}
                                alt='img'
                                style={{ height: "200px", margin: "auto" }}
                            />
                        </Box>

                        <Link underline="none" color="secondary" href={`/SeeDetails/${pokemon.name}`}>See details</Link>
                    </Grid>
                );
            })}
        </Grid>
    );
}
export default GridPokemon;