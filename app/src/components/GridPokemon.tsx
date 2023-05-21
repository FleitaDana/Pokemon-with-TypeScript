import React, { useState } from 'react'
import { Box, Grid, Typography, Link } from '@mui/material';

interface Props {
    listPokemon: Array<Pokemon>,
    //pokemonImage: Array<string>,
}

interface Pokemon {
    name: string,
    id: number,
    images: string | undefined,
}

const GridPokemon = ({ listPokemon }: Props) => {


//     const [imageUrl, setImageUrl] = useState(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`);

//     const handleImageError= (e: any) => {
//     setImageUrl("https://default-image");
//   }

  
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
                        xs={6}
                        md={6}
                        lg={2}
                        sx={{ backgroundColor: '#FFFFFF', boxShadow: 10, borderRadius: '50%', paddingTop: 2, transition: "0.2s", "&:hover": { transform: "scale(1.05)" } }}
                        margin={2}
                        width={15}
                    >
                        <Link underline="none" color="#212121" href={`/SeeDetails/${pokemon.name}`} sx={{ margin: "auto" }}> 

                            <Box flex-direction="column" display="flex" justifyContent="center" alignItems="center" sx={{ margin: 0 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img
                                        width="150px"
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                                        // onError={handleImageError}
                                        alt='img'
                                        style={{ height: "200px", margin: "auto" }}
                                    />
                                    <Typography align='center' sx={{ fontSize: 16, fontStyle: 'oblique', marginBottom: 2, borderRadius: 50, width: 100, }}>{pokemon.name.charAt(0).toUpperCase()}{pokemon.name.slice(1)}</Typography>
                                </div>
                            </Box>

                        </Link>
                    </Grid>
                );
            })}
        </Grid>
    );
}
export default GridPokemon;