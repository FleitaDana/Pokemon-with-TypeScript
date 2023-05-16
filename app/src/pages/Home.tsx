import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Pagination, PaginationItem, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import GridPokemon from '../components/GridPokemon';
import Loading from '../components/Loading';
import { Link as LinkPagination } from 'react-router-dom';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import Error from '../components/Error';

const color = '#ffffff';

interface Pokemon {
    name: string;
}


const GET_POKEMONS = gql`
query GETPOKEMONS($offset: Int!){
  poke: pokemon_v2_pokemon(offset: $offset, limit: 20) {
    id
    name
    pokemon_v2_pokemonsprites {
      sprites
    }
  }
  cantidad: pokemon_v2_pokemon_aggregate {
    aggregate {
      count
    }
  }
}`;



const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    poke: pokemon_v2_pokemon(where: {name: {_ilike: $name}}) {
      name
      id
    }
  }
`;

const Home = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    const offset = (page - 1) * 20;

    const [lookForPokemon, setLookForPokemon] = useState("");

    const [
        fetchPokemon,
        { data: pokemonData, error: pokemonError },
    ] = useLazyQuery(GET_POKEMON_BY_NAME);

    const { loading, error, data } = useQuery(GET_POKEMONS, { variables: { page, offset } });

    if (loading) return <Loading></Loading>;
    if (error) return <Error></Error>;

    const countt = Math.ceil(data.cantidad.aggregate.count / 20);
    //console.log(data.cantidad.aggregate.count);

    return (
        <div className='background-table'>
            <Grid
                container
                flexDirection="row"
                justifyContent="center"
                p="20"
                height="100%"
                paddingTop={'20px'}
                paddingBottom={'20px'}
            >
                <Grid item
                    justifyContent="center"
                    xs={12} md={12} lg={12}
                >
                    <Box display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center" padding={0} >
                        <div>
                            {/* <TextField
                                id="standard-basic"
                                label="Look for pokemon"
                                variant="standard"
                                placeholder="name pokemon"
                                value={lookForPokemon}
                                onChange={(event) => {
                                    setLookForPokemon(event.target.value);
                                }}
                                
                            /> */}
                            <TextField
                                id="standard-basic"
                                label="Look for pokemon"
                                variant="standard"
                                placeholder="name pokemon"
                                value={lookForPokemon}
                                onChange={(event) => {
                                    setLookForPokemon(event.target.value);
                                    fetchPokemon({
                                        variables: {
                                            name: `%${event.target.value}%`,
                                        },
                                    });
                                }}
                            />
                            {/* <Button sx={{ marginTop: '15px' }} onClick={() => {
                                fetchPokemon({
                                    variables: {
                                        name: lookForPokemon,
                                    },
                                });
                            }}><SavedSearchIcon sx={{
                                fontSize: 'large', width: '25px', height: '25px', color: '#212121', "&:hover": {
                                    backgroundColor: 'none',
                                }
                            }} /></Button> */}
                        </div>

                        {pokemonData && pokemonData.poke.length == 0 ? (
                            <Typography variant="h6" color="white" align='center' sx={{ fontStyle: 'oblique' }}>
                                There is no pokemon!
                            </Typography>
                        ) :
                            (" ")}
                    </Box>

                    {pokemonData && pokemonData.poke.length > 0 ? (
                        <GridPokemon listPokemon={pokemonData.poke} />
                    ) : (
                        <>
                            <Box display="flex" flexDirection="column" justifyContent="left" alignItems="center" padding={0} >
                                <Pagination
                                    variant="outlined"
                                    shape="rounded"
                                    page={page}
                                    count={countt}
                                    renderItem={(item) => (
                                        <PaginationItem sx={{
                                            backgroundColor: item.selected ? '{color}' : '#00897b', "&:hover": {
                                                backgroundColor: '#b2dfdb',
                                            }, "&:select": {
                                                backgroundColor: '#b2dfdb',
                                            }
                                        }}
                                            component={LinkPagination}
                                            to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                                            {...item}
                                        />
                                    )}
                                />
                            </Box>
                            <GridPokemon listPokemon={data.poke} />
                        </>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
export default Home;

// const Home = () => {

//     const [listPokemon, setListPokemon] = useState([])
//     const [names, setNames] = useState([])
//     const [pokemonImage, setPokemonImage] = useState((Object));
//     const [count, setCount] = useState<any>()

//     const location = useLocation();
//     const query = new URLSearchParams(location.search);
//     const page = parseInt(query.get('page') || '1', 10);

//     useEffect(() => {

//         getPokemones(page)
//             .then((res) => {
//                 setListPokemon(res.data.results)


//                 const names = res.data.results.map((pokemon: Pokemon) => pokemon.name);
//                 setNames(names);

//                 console.log(names);

//                 setCount(((res.data.count / 20) + (res.data.count % 20)))
//             })
//     }, [page])

//     useEffect(() => {
//         if (listPokemon.length > 0) {
//             Promise.all(
//                 names.map((name) => {
//                     return getPokemonesByName(name)
//                         .then((res) => {
//                             return res.data.sprites.other.home.front_default;
//                         });
//                 })
//             )
//                 .then((images) => {
//                     setPokemonImage(images);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }
//     }, [listPokemon, names]);

//     console.log(pokemonImage);

//     return (
//         <div className='background-table'>
//             <Grid
//                 container
//                 flexDirection="column"
//                 justifyContent="center"
//                 alignItems="center"
//                 p="20"
//                 height="100%"
//                 paddingTop={'20px'}
//                 paddingBottom={'20px'}
//             >
//                 <Pagination
//                     page={page}
//                     count={count}
//                     renderItem={(item) => (
//                         <PaginationItem
//                             component={LinkPagination}
//                             to={`/home${item.page === 1 ? '' : `?page=${item.page}`}`}
//                             {...item}
//                         />
//                     )}
//                 />

//                 <Grid item
//                     justifyContent="center"
//                     alignItems="center"
//                     xs={12} md={12} lg={12}
//                 >
//                     {listPokemon.length > 0 && pokemonImage.length > 0 ? (
//                         <GridPokemon
//                             listPokemon={listPokemon}
//                             pokemonImage={pokemonImage}
//                         />
//                     ) : (
//                         <div><Loading></Loading></div>
//                     )}
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }
// export default Home;