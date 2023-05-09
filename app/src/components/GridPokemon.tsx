import React from 'react'
import { Box, Grid, Typography, Link } from '@mui/material';


interface Props{
 listPokemon: Array<Pokemon>,
 //pokemonImage: Array<string>,
}

interface Pokemon{
    name: string,
    id: number,
    images: string | undefined,
}

const GridPokemon = ({listPokemon}: Props) => {

    

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            margin={0}
            height={'100vh'}
        >
            {listPokemon.map((pokemon, index) => {
                /* console.log(index)
                const imagen = pokemonImage[index];
                console.log(pokemonImage[index]) */
                return (
                    <Grid
                        item
                        key={index}
                        justifyContent="center"
                        alignItems="center"
                        xs={10}
                        md={5}
                        lg={3}
                        sx={{ backgroundColor: '#FFFFFF', boxShadow: 10, borderRadius: 1, paddingTop: 2}}
                        margin={2}    
                    >
                        <Typography align='center' sx={{ boxShadow: 3}}> {pokemon.name}</Typography>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                width="150px"
                                src={pokemon.images}
                                alt='img'
                                style={{ height: "200px", margin: "auto" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: '2px'}}>
                        <Link underline="none" color="secondary" href={`/SeeDetails/${pokemon.name}`} sx={{margin: "auto" }}>See details</Link>
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
}
export default GridPokemon;