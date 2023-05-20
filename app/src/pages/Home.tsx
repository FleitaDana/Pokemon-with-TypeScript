import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Pagination, PaginationItem, TextField, Typography, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useLocation } from 'react-router-dom';
import GridPokemon from '../components/GridPokemon';
import Loading from '../components/Loading';
import { Link as LinkPagination } from 'react-router-dom';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import Error from '../components/Error';
import SearchIcon from '@mui/icons-material/Search';

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

const GET_FILTERS = gql`
query GetFilters($name: String, $isBaby: Boolean, $color: String, $minWeight: Int, $maxWeight: Int, $types: [String]) {
    pokemon: pokemon_v2_pokemon(where: {name: {_ilike: $name}, 
      pokemon_v2_pokemonspecy: {is_baby: {_eq: $isBaby}, 
        pokemon_v2_pokemoncolor: {name: {_ilike: $color}}}, 
      weight: {_gte: $minWeight, _lte: $maxWeight}, 
      pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_in: $types}}}}) {
      id
      name
      height
      weight
    }
  }
  `;
  
const GET_COLOR = gql`
query GET_POKEMON_COLOR {
    pokemon_v2_pokemoncolor {
        name
    }
    pokemon_v2_type {
        name
    }
  }
  `;

const Home = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    const offset = (page - 1) * 20;

    const [pokemonName, setPokemonName] = useState('');

    const [isBaby, setIsBaby] = useState(false);
    const [color, setColor] = useState<String>("");
    const [minWeight, setMinWeight] = useState<number>(0);
    const [maxWeight, setMaxWeight] = useState<number>(100);
    const [types, setTypes] = useState<string[]>([]);
    //const [selectedColorsOptions, setSelectedColorsOptions] = useState<Option[]>([]);

    const [fetchPokemon, { loading: loadingFilter, data: dataFilter }] = useLazyQuery(GET_FILTERS,
        { variables: { name: `%${pokemonName}%`, isBaby, color, minWeight, maxWeight, types } });

    const { loading, error, data, refetch } = useQuery(GET_POKEMONS, { variables: { page, offset } });

    const { data: dataColor } = useQuery(GET_COLOR);

    useEffect(() => {
        if (dataColor && color.length === 0) {
            setColor(`%`);
        }

    }, [dataColor, color]);


    useEffect(() => {
        

        if(dataColor && types.length === 0){
            setTypes(dataColor?.pokemon_v2_type?.map((item: any) => item.name));
        }

    }, [dataColor, types]);


    useEffect(() => {
        setIsBaby(false);
        setPokemonName('');
    }, [page]);

    if (loading) return <Loading></Loading>;
    if (error) return <Error></Error>;
    if (loadingFilter) return <Loading></Loading>;

    const countt = Math.ceil(data.cantidad.aggregate.count / 20);
    //console.log(data.cantidad.aggregate.count);

    const searchName = (e: any) => {
        setPokemonName(e.target.value);
    }

    const searchBaby = (e: any) => {
        setIsBaby(e.target.checked);
    }

    const searchColor = (e: any) => {
        setColor(e.target.value);
    };

    const searchMinWeight = (e: any) => {
        setMinWeight(e.target.value);
    }

    const searchMaxWeight = (e: any) => {
        setMaxWeight(e.target.value);
    }

    const searchTypes = (e: any) => {
        setTypes(e.target.value);
    };

    const search = (e: any) => {

        // if (pokemonName.length > 0) {
        //   let variables: any = {
        //     name: `%${pokemonName}%`,
        //     isBaby,
        //   };

        //   if (color && color !== 'Nothing') { // Si una opción diferente a "Nothing" fue seleccionada
        //     variables.color = color;
        //   }

        //   fetchPokemon({
        //     variables,
        //   });

        // } else {
        //   console.log('entra');
        //   refetch({ page, offset });
        // }

        let variables: any = {
            name: `%${pokemonName}%`,
            isBaby,
            minWeight,
            maxWeight,
            types,
        };

        // if (isBaby){
        //     variables.isBaby = isBaby;
        // } 

        if (color || color !== '') { // Si una opción diferente a "Nothing" fue seleccionada
            variables.color = color;
        }

        // if (pokemonName && pokemonName.length > 0){
        //     variables.name = `%${pokemonName}%`;
        // } 

        fetchPokemon({
            variables
        });

        if (dataFilter.pokemon.length === 0){
            <Typography variant="h6" color="white" align='center' sx={{ fontStyle: 'oblique' }}>
                            There is no pokemon with the searched specifications
            </Typography>
        }
    };

    //console.log(dataColor.pokemon_v2_pokemoncolor);

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
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" padding={0} >

                        <TextField
                            id="standard-basic"
                            //label="Look for a pokemon"
                            variant="outlined"
                            label={<span>Name pokemon</span>}
                            //placeholder="Name pokemon"
                            value={pokemonName}
                            onChange={searchName}
                         
                        //onChange={(e) => setPokemonName(e.target.value)}
                        />
                        <TextField
                            type="number"
                            variant="outlined"
                            value={minWeight}
                            onChange={searchMinWeight}
                            label={<span>Min Weight</span>}
                            size="small"
                        />

                        <TextField
                            type="number"
                            variant="outlined"
                            value={maxWeight}
                            onChange={searchMaxWeight}
                            label={<span>Max Weight</span>}
                            size="small"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isBaby}
                                    //onChange={(e) => setIsBaby(e.target.checked)}
                                    onChange={searchBaby}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label="¿Is a baby?"
                        />

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Select color</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={color}
                                onChange={searchColor}
                                label="Age"
                            >
                                <MenuItem value={`%`}>
                                    <em>All</em>
                                </MenuItem>
                                {dataColor?.pokemon_v2_pokemoncolor.map((item: any) => (
                                    <MenuItem value={item.name}><em>{item.name}</em></MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Select type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={types}
                                onChange={searchTypes}
                                label="Age"
                            >
                                <MenuItem value={types}>
                                    <em>All</em>
                                </MenuItem>
                                {dataColor?.pokemon_v2_type.map((item: any) => (
                                    <MenuItem value={item.name}><em>{item.name}</em></MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button sx={{ marginTop: '15px' }}
                            //onClick={fetchPokemon}>
                            onClick={search}>
                            <SearchIcon sx={{
                                fontSize: 'large', width: '25px', height: '25px', color: '#212121', "&:hover": {
                                    backgroundColor: 'none',
                                }
                            }} />
                        </Button>

                    </Box>


                    {/* {dataFilter && dataFilter.pokemon.length == 0 ? (
                        <Typography variant="h6" color="white" align='center' sx={{ fontStyle: 'oblique' }}>
                            There is no pokemon with the searched specifications
                        </Typography>
                    ) :
                        (" ")} */}


                    {dataFilter && dataFilter.pokemon.length > 0 ? (
                        <GridPokemon listPokemon={dataFilter.pokemon} />
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
                            
                            <Typography variant="h3" color="white" align='center' sx={{ fontStyle: 'oblique' }}>
                                Pokemon grid
                            </Typography>
                            <GridPokemon listPokemon={data.pokemon} />

                        </>
                    )}
                </Grid>
            </Grid>
        </div >
    );
}
export default Home;