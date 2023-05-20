import React, { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Grid, Pagination, PaginationItem, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import GridPokemon from '../components/GridPokemon';
import Loading from '../components/Loading';
import { Link as LinkPagination } from 'react-router-dom';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import Error from '../components/Error';
import SearchIcon from '@mui/icons-material/Search';
import ButtonBack from '../components/ButtonBack';

const color = '#ffffff';

interface Pokemon {
    name: string;
}

const GET_POKEMONS = gql`
query GETPOKEMONS($offset: Int!){
  pokemon: pokemon_v2_pokemon(offset: $offset, limit: 20) {
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

// const GET_POKEMON_BY_NAME = gql`
//   query GetPokemonByName($name: String!) {
//     poke: pokemon_v2_pokemon(where: {name: {_ilike: $name}}) {
//       name
//       id
//     }
//   }
// `;

const GET_ALL_POKEMONS = gql`
query GETPOKEMONS($name: String) {
    pokemon_v2_pokemon( where: {  name: {_ilike: $name}}) {
      id
      name
      height
      weight
    }
    pokemon_v2_pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
  `;


const Home = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page:number = parseInt(query.get('page') || '1', 10);
    const offset:number = (page - 1) * 20;

    const [pokemonName, setPokemonName] = useState('');
    const [isBaby, setIsBaby] = useState(false);

    const handleNameChange = (e: any) => {
        setPokemonName(e.target.value);
    }


    //  useEffect(()=>{
    //      (pokemonName.length) == 0 && refetch()
    //  },[pokemonName])

    

    // const handleIsBabyChange = (e: any) => {
    //     setIsBaby(e.target.checked);
    // }

    const handleSearch = async() => {
       if (pokemonName.length > 0){
            fetchPokemon({
                variables: {
                    name: `%${pokemonName}%`,
                    // isBaby,
                }
            });
        } else {
            console.log("entra");
           await refetch({page:page,offset:offset});
        }
        
    }

    

    console.log(pokemonName);

    

    // const [ fetchPokemon, { data: pokemonData, error: pokemonError } ] = 
    // useLazyQuery(GET_POKEMON_BY_NAME, { variables: { name: `%${pokemonName}%`, isBaby } });

    const { loading, error, data: dataPage, refetch } = useQuery(GET_POKEMONS, { variables: { page, offset } });

    const [fetchPokemon, { data }] = useLazyQuery(GET_ALL_POKEMONS,
        { variables: { name: `%${pokemonName}%` } });


        
    //const countt = Math.ceil(dataPage.cantidad.aggregate.count / 20);
    const countt = dataPage?.cantidad?.aggregate?.count ?
        Math.ceil(dataPage.cantidad.aggregate.count / 20)
        : 0;

    console.log(data);
    console.log(dataPage);
    if (loading) return <Loading></Loading>;
    if (error) return <Error></Error>;


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
                                label="Look for a pokemon"
                                variant="standard"
                                placeholder="name pokemon"
                                value={pokemonName}
                                onChange={handleNameChange}
                            // {(event) => {
                            //     setLookForPokemon(event.target.value);

                            // fetchPokemon({
                            //     variables: {
                            //         name: `%${event.target.value}%`,
                            //     },
                            // });
                            //}}
                            />

                            {/* <label>
                                Is baby:
                                <input type="checkbox" checked={isBaby} onChange={handleIsBabyChange} />
                            </label> */}

                            {/*  <Checkbox
                                checked={isBaby}
                                onChange={handleIsBabyChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <br /> */}
                            {/* <button type="button" onClick={handleSearch}>Search</button> */}

                            <Button sx={{ marginTop: '15px' }} 
                            onClick={handleSearch} 
                            // disabled={!pokemonName}
                            // () => {
                            // fetchPokemon({
                            //     variables: {
                            //         name: `%${lookForPokemon}%`,
                            //     },
                            // });
                            //}}
                            ><SearchIcon sx={{
                                fontSize: 'large', width: '25px', height: '25px', color: '#212121', "&:hover": {
                                    backgroundColor: 'none',
                                }
                            }} /></Button>
                        </div>

                        {/* {pokemonData && pokemonData.poke.length == 0 ? (
                            <Typography variant="h6" color="white" align='center' sx={{ fontStyle: 'oblique' }}>
                                There is no pokemon!
                            </Typography>
                        ) :
                            (" ")} */}
                    </Box>

                    {/* <GridPokemon listPokemon={data.poke} /> */}


               

                    {data?.pokemon_v2_pokemon ? (
                        <>
                        <GridPokemon listPokemon={data.pokemon_v2_pokemon} />
                        </>
                    ) : (
                        <>
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
                                        to={`${item.page === 1 ? `?page=${item.page}` : `?page=${item.page}`}`}
                                        {...item}
                                    />
                                )}
                            />
                            <GridPokemon listPokemon={dataPage.poke} />
                        </>
                    )}

                    {/* {dataPage && dataPage.poke.length > 0 ? (
                        <>
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
                                    to={`${item.page === 1 ? `?page=${item.page}` : `?page=${item.page}`}`}
                                    {...item}
                                />
                            )}
                        />
                        <GridPokemon listPokemon={dataPage.poke} />
                    </>
                    ): (
                        <GridPokemon listPokemon={data.pokemon_v2_pokemon}
                    )} */}

                    


                    {/* {data && data.poke.length > 0 ? (
                        <GridPokemon listPokemon={data.poke} />
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
                    )} */}

                    {/* {data.pokemon_v2_pokemon && data?.pokemon_v2_pokemonlength == 0 ? (
                            <Typography variant="h6" color="white" align='center' sx={{ fontStyle: 'oblique' }}>
                                There is no pokemon!
                            </Typography>
                        ) :
                            (" ")}
                    

                    {data.pokemon_v2_pokemon && data.pokemon_v2_pokemon.length > 0 ? (
                        <GridPokemon listPokemon={data.pokemon_v2_pokemon} />
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
                            <GridPokemon listPokemon={dataPage.poke} />
                        </>
                    )} */}

                </Grid>
            </Grid>
        </div>
    );
}
export default Home;


