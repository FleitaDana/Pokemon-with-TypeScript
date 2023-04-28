import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link as LinkPagination } from 'react-router-dom';

const GridPokemon = ({ listPokemon = [], pokemonImage = [] }) => {

    console.log(pokemonImage)
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            p="20"
            spacing={3}
            height="100%"
            margin={0}
        >
            {/* {listPokemon.map((data, index) => (
                <Grid item
                key={index}
                    justifyContent="center"
                    alignItems="center"
                    xs={10} md={5} lg={3}
                    width={100}
                    height={200}
                    backgroundColor='#FFFFFF'
                    margin={2}
                >
                    {pokemonImage.map((imagen, index) =>
                    <img key={index} width="200" p="0" src={imagen} alt='img' sx={{ height: "200px", margin: "auto" }}></img>
                    )}
     
                    <Typography align='center'>{data.name}</Typography>

                </Grid>
            ))} */}

            {listPokemon.map((data, index) => {
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
                        width={100}
                        height={200}
                        backgroundColor='#FFFFFF'
                        margin={2}
                    >
                        <Typography align='center'>{data.name}</Typography>
                        <img
                            width="150"
                            p="0"
                            src={imagen}
                            alt='img'
                            sx={{ height: "200px", margin: "auto" }}
                        />
                        
                    </Grid>
                );
            })}
        </Grid>
    );



}
export default GridPokemon;
