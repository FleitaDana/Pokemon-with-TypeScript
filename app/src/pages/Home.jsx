import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import TablePokemon from '../components/TablePokemon';
import { useLocation } from 'react-router-dom';
import { getPokemones, getPokemonesByName } from '../api/apis';
import GridPokemon from '../components/GridPokemon';

const Home = () => {

    const [listPokemon, setListPokemon] = useState([])
    const [names, setNames] = useState([])
    const [pokemonImage, setPokemonImage] = useState({});
    const [count, setCount] = useState()



    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    useEffect(() => {

        getPokemones(page)
            .then((res) => {
                setListPokemon(res.data.results)


                const names = res.data.results.map((pokemon) => pokemon.name);
                setNames(names);

                console.log(names);

                setCount(parseInt(res.data.count / 20) + (res.data.count % 20))

            })

       
       


        // {
        //     names.map((name) => {
        //         console.log(name)
        //         getPokemonesByName(name)
        //             .then((res) => {
        //                 setPokemonImage(prevImages => prevImages.concat(res.data.sprites.other.home.front_default));
        //             })
                    
        //     }
        //     )
        // }

        Promise.all(
            names.map((name) => {
              return getPokemonesByName(name)
                .then((res) => {
                  return res.data.sprites.other.home.front_default;
                });
            })
          )
          .then((images) => {
            setPokemonImage(images);
          })
          .catch((error) => {
            console.log(error);
          });

        



    }, [page])

    console.log(pokemonImage);

    return (
        <div className='background-table'>
            <Grid
                container
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p="20"
                height="100%"
            >

                <Grid item
                    justifyContent="center"
                    alignItems="center"
                    xs={12} md={12} lg={12}
                >
                    <GridPokemon
                        listPokemon={listPokemon}
                        pokemonImage={pokemonImage}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
export default Home;