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

                return (
                    <Grid
                        item
                        key={index}
                        justifyContent="center"
                        alignItems="center"
                        xs={10}
                        md={5}
                        lg={3}
                        sx={{ backgroundColor: '#FFFFFF', boxShadow: 10, borderRadius: 1, paddingTop: 2, transition: "0.2s", "&:hover": { transform: "scale(1.05)" }}}
                        margin={2}    
                    >
                        <Link underline="none" color="#212121" href={`/SeeDetails/${pokemon.name}`} sx={{margin: "auto" }}>
                        <Typography align='center' sx={{ fontSize: 20, boxShadow: 3, fontStyle: 'oblique'}}> {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Typography>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                width="150px"
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                                alt='img'
                                style={{ height: "200px", margin: "auto" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: '2px'}}>
                        </Box>
                        </Link>
                    </Grid>
                );
            })}
        </Grid>
    );
}
export default GridPokemon;