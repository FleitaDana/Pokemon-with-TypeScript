import React, { useEffect, useState } from 'react'
import { Box, Grid, Pagination, PaginationItem, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getPokemones, getPokemonesByName } from '../api/apis';
import GridPokemon from '../components/GridPokemon';
import Loading from '../components/Loading';
import { Link as LinkPagination } from 'react-router-dom';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import Error from '../components/Error';

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
    poke: pokemon_v2_pokemon(where: {name: {_eq: $name}}) {
        name
      }
}`;



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




    //const countt = Math.ceil(((data.cantidad.aggregate.count / 20) + (data.cantidad.aggregate.count % 20)));
    const countt = Math.ceil(data.cantidad.aggregate.count / 20);
    console.log(data.cantidad.aggregate.count);


    return (
        <div className='background-table'>
            <Grid
                container
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                p="20"
                height="100%"
                paddingTop={'20px'}
                paddingBottom={'20px'}
            >
                {/* <Pagination
                    page={page}
                    count={countt}
                    renderItem={(item) => (
                        <PaginationItem
                            component={LinkPagination}
                            to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                            {...item}
                        />
                    )}
                /> */}

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {/* <TextField id="standard-basic" label="buscar Pokemon" variant="standard" /> */}

                    {/* <TextField
                        id="standard-basic"
                        label="buscar Pokemon"
                        variant="standard"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setLookForPokemon(event.target.value);
                        }}
                    />
                    <button onClick={() => {
                                fetchPokemon({
                                    variables: {
                                        name: lookForPokemon,
                                    },
                                });
                            }}>Look for pokemon</button> */}

                </Box>


                <Grid item
                    justifyContent="center"
                    alignItems="center"
                    xs={12} md={12} lg={12}
                >

                    <Box display="flex" flexDirection="column" justifyContent="left" alignItems="left" padding={0} >
                        <div>
                            <input
                                type="text"
                                placeholder="pokemonnnn"
                                onChange={(event) => {
                                    setLookForPokemon(event.target.value);
                                }}
                            />
                            <button onClick={() => {
                                fetchPokemon({
                                    variables: {
                                        name: lookForPokemon,
                                    },
                                });
                            }}>Look for pokemon</button>
                        </div>
                        <div>
                            {pokemonData && (
                                <div>
                                    <h1> pokemonName: {pokemonData.poke[0].name}</h1>
                                </div>
                            )}
                        </div>
                    </Box>

                    {/* {data.poke.length > 0 ? (
                        <GridPokemon
                            listPokemon={data.poke}
                        />
                    ) : (
                        <div><Loading></Loading></div>
                    )} */}

                    {pokemonData && pokemonData.poke.length > 0 ? (
                        <GridPokemon listPokemon={pokemonData.poke} />
                    ) : (

                        <>

                            <Pagination
                                page={page}
                                count={countt}
                                renderItem={(item) => (
                                    <PaginationItem
                                        component={LinkPagination}
                                        to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                                        {...item}
                                    />
                                )}
                            />

                            <GridPokemon listPokemon={data.poke} />

                        </>
                    )}


                    {/*  {data.poke.length > 0 && data.images.length > 0 ? (
                        <GridPokemon
                            listPokemon={data.poke}
                            pokemonImage={data.images}
                        />
                    ) : (
                        <div><Loading></Loading></div>
                    )} */}
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