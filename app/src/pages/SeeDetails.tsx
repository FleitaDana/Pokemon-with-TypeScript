import { Box, Button, Grid, Link} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CardPokemon from '../components/CardPokemon';
import NotFound from '../components/NotFound';
import Loading from '../components/Loading';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ButtonBack from '../components/ButtonBack';
import theme from '../assets/Theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useQuery, gql } from '@apollo/client';

interface Evolutions {
    species: {
        name: string
    }
    evolves_to: any
}

const GET_POKEMONS = gql`
  query GETPOKEMONS ($name: String!){
    poke: pokemon_v2_pokemon(where: {name: {_eq: $name}}) {
      id
      name
      height
      weight
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
      }
      stats: pokemon_v2_pokemonstats {
        id
        dato: pokemon_v2_stat {
          name
        }
        base_stat
      }
      specy: pokemon_v2_pokemonspecy {
        chain: pokemon_v2_evolutionchain {
          species: pokemon_v2_pokemonspecies {
            name
          }
        }
      }
    }
  }`;


const SeeDetails = () => {

    const { name } = useParams();

    const { loading, error, data } = useQuery(GET_POKEMONS, { variables: { name } });

    useEffect(() => {
        getData();
    }, [name])

    const [dataEvolution, setDataEvolution] = useState<String | null>();

    //if (error) return <p>error</p>;

    const getData = () => {
        localStorage.getItem('evoMedia');
        setDataEvolution(localStorage.getItem('evoMedia'));
    }

    if (loading) return <Loading></Loading>;
    else if (data.poke[0]) {
        return (<div className='background-card'>
            <Grid
                container
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                p="20"
                sx={{
                    [theme.breakpoints.down('sm')]: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
                }}
            >
                <Grid item
                    justifyContent="center"
                    alignItems="center"
                    xs={12} md={12} lg={12}
                    sx={{ margin: 2 }}>

                    <Box display="flex" flexDirection="column" justifyContent="left" alignItems="left" padding={0} >

                        {dataEvolution != null &&
                            
                                <Box display="flex" flexDirection="column" height="100px" position="fixed" top="20px" left="20px"
                                    sx={{
                                        [theme.breakpoints.down('sm')]: { position: 'static', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
                                    }}>
                                    <ButtonBack></ButtonBack>
                                </Box>
                            }

                        <CardPokemon
                            pokemon={data.poke[0]}
                            pokemonEvolutions={data.poke[0].specy.chain.species.map((item: any) => item.name)}
                        />
                    </Box>

                    {dataEvolution == null ?
                        <Box display="flex" justifyContent="right" alignItems="right" > 
                            <Link underline='none' href='/home'><button><HomeRoundedIcon sx={{ fontSize: 'large', width: '20px', height: '20px', borderRadius: '50%' }} /></button>
                            </Link>
                        </Box>
                        : (
                            ''
                        )}
                </Grid>
            </Grid>
        </div>)
    }
    else {
        return (<NotFound />);
    }
}
export default SeeDetails;


