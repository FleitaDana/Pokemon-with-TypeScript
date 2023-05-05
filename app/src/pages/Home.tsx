import React, { useEffect, useState } from 'react'
import { Grid, Pagination, PaginationItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getPokemones, getPokemonesByName } from '../api/apis';
import GridPokemon from '../components/GridPokemon';
import Loading from '../components/Loading';
import { Link as LinkPagination } from 'react-router-dom';

interface Pokemon{
    name: string;
}

const Home = () => {

    const [listPokemon, setListPokemon] = useState([])
    const [names, setNames] = useState([])
    const [pokemonImage, setPokemonImage] = useState((Object));
    const [count, setCount] = useState<number>()

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    useEffect(() => {

        getPokemones(page)
            .then((res) => {
                setListPokemon(res.data.results)


                const names = res.data.results.map((pokemon:Pokemon) => pokemon.name);
                setNames(names);

                console.log(names);

                setCount((res.data.count / 20) + (res.data.count % 20))
            })
    }, [page])

    useEffect(() => {
        if (listPokemon.length > 0) {
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
        }
    }, [listPokemon, names]);

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
                paddingTop={'20px'}
            >

                <Pagination
                    page={page}
                    count={count}
                    renderItem={(item) => (
                        <PaginationItem
                            component={LinkPagination}
                            to={`/home${item.page === 1 ? '' : `?page=${item.page}`}`}
                            {...item}
                        />
                    )}
                />

                <Grid item
                    justifyContent="center"
                    alignItems="center"
                    xs={12} md={12} lg={12}
                >
                    {listPokemon.length > 0 && pokemonImage.length > 0 ? (
                        <GridPokemon
                            listPokemon={listPokemon}
                            pokemonImage={pokemonImage}
                        />
                    ) : (
                        <div><Loading></Loading></div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
export default Home;