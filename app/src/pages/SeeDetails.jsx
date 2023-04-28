import { Box, Grid, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CardPokemon from '../components/CardPokemon';
import { getPokemonesById, getSpeciesPokemon, getEvolutions } from '../api/apis';
import NotFound from '../components/NotFound';
import Loading from '../components/Loading';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ButtonBack from '../components/ButtonBack';
import theme from '../assets/Theme';

const SeeDetails = () => {

    const paramsId = useParams();

    const [pokemon, setPokemon] = useState('');
    const [pokemonImage, setPokemonImage] = useState('');
    const [pokemonAbilities, setPokemonAbilities] = useState([])
    const [pokemonStats, setPokemonStats] = useState([])
    const [pokemonSpecies, setPokemonSpecies] = useState([])
    const [pokemonEvolutionsId, setPokemonEvolutionsId] = useState();
    const [loading, setLoading] = useState(false);
    const [evolutionOne, setEvolutionOne] = useState('');
    const [evolutionTwo, setEvolutionTwo] = useState([]);
    const [evolutionTree, setEvolutionTree] = useState([]);
    const [totalEvolutionsMedia, setTotalEvolutionsMedia] = useState([]);
    const [totalEvolutionsFinal, setTotalEvolutionsFinal] = useState([]);
    const [dataEvolution, setDataEvolution] = useState('');

    useEffect(() => {
        data();
    }, [paramsId])

    useEffect(() => {
        getData();
    }, [paramsId])

    const data = () => {

        setLoading(true)

        getPokemonesById(paramsId.id)

            .then((res) => {
                setPokemon(res.data);
                setPokemonImage(res.data.sprites.other.home.front_default)
                setPokemonAbilities(res.data.abilities);
                setPokemonStats(res.data.stats);
                setPokemonSpecies(res.data.species);

                //if (res.data.evolution_chain?.url === null) { // Verifica si la URL no es null

                getSpeciesPokemon(paramsId.id)
                    .then((res) => {
                        setPokemonEvolutionsId(res.data.evolution_chain.url)
                        const evoId = (res.data.evolution_chain.url).split('/')[6];

                        getEvolutions(parseInt(evoId))
                            .then((res) => {
                                setEvolutionOne(res.data.chain.species.name);
                                setEvolutionTwo(res.data.chain.evolves_to?.map((item) => item.species.name));
                                setEvolutionTree(res.data.chain.evolves_to?.map((item) => item.evolves_to?.map((item) => item.species.name)));
                                check(res.data.chain.species.name, res.data.chain.evolves_to?.map((item) => item.species.name), res.data.chain.evolves_to?.map((item) => item.evolves_to?.map((item) => item.species.name)));
                            })
                    });
                // } else { 
                //     setPokemonEvolutionsId(null); // Establece el estado de la evolución como null
                //     console.log(pokemonEvolutionsId)
                // }
            })
            .finally(() =>
                setLoading(false)
            )
    }

    const check = (evolutionOne, evolutionTwo, evolutionTree) => {

        //if (evolutionTwo !== null && evolutionTwo !== undefined && evolutionTree === 0) {
        if (Array.isArray(evolutionTwo) && evolutionTwo?.length > 0) {
            setTotalEvolutionsMedia(evolutionTwo.map((item) => item));
            // console.log(totalEvolutionsMedia);
        }
        else {
            setTotalEvolutionsMedia(evolutionTwo);
        }
        // } else {
        //     setTotalEvolutionsFinal(["Does not have"]);
        // }

        //console.log(totalEvolutionsMedia);
        // if (evolutionTree !== null && evolutionTree !== undefined && evolutionTree === 0) {
        if (Array.isArray(evolutionTree) && evolutionTree?.length > 0) {
            for (let i = 0; i < evolutionTree.length; i++) {
                if (evolutionTree[i] !== null) {
                    setTotalEvolutionsFinal((evolutionTree[i]));
                    // setTotalEvolutionsFinal(evolutionTree.map((item) => item));
                }

            }
        }
        else {
            setTotalEvolutionsFinal(prevList => prevList.concat(evolutionTree));
            console.log(totalEvolutionsFinal);
        }
    }

    // const existe = () => {
    //     if (pokemonEvolutionsId === undefined) {
    //         setEvolutionOne("Does not have");
    //         setTotalEvolutionsMedia(["Does not have"]);
    //         setTotalEvolutionsFinal(["Does not have"]);
    //     }
    //     else {
    //         check()
    //     }
    // }

    const getData = () => {
        localStorage.getItem('evoMedia');
        // console.log("ESTOY EN GET DATA")
        // console.log(localStorage.getItem('evoMedia'))
        setDataEvolution(localStorage.getItem('evoMedia'));
        //console.log("DATA EVOLUTION", dataEvolution)
    }

    console.log(dataEvolution)

    if (loading) {
        return (<Loading />);
    } else if (pokemon) {
        return (<div className='background-card'>
            <Grid
                container
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                p="20"
                sx={{[theme.breakpoints.down('sm')]:{flexDirection:'column', justifyContent:'center' ,alignItems:'center'},
            }}
            >
                <Grid item
                    justifyContent="center"
                    alignItems="center"
                    xs={12} md={12} lg={12}
                    sx={{ margin: 2 }}>

                    <Box display="flex" flexDirection="column" justifyContent="left" alignItems="left" padding={0} >

                        {dataEvolution == null ?
                        (
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Link underline='none' href={`/SeeDetails/${pokemon.id === 1 ? 1 : pokemon.id - 1}`}><button><KeyboardArrowLeftIcon sx={{ fontSize: 'large', width: '20px', height: '20px' }} /></button>
                        </Link>
                        <Link underline='none' href={`/SeeDetails/${pokemon.id + 1}`}><button><KeyboardArrowRightIcon sx={{ fontSize: 'large', width: '20px', height: '20px' }} /></button>
                        </Link>
                        </Box>
                        )
                         : (
                            <Box display="flex" flexDirection="column"  height="100px" position="fixed" top="20px" left="20px"
                            sx={{[theme.breakpoints.down('sm')]:{position: 'static', flexDirection:'column', justifyContent:'center' ,alignItems:'center'},
            }}>
                         <ButtonBack></ButtonBack>
                         </Box>
                         )}

                        <CardPokemon
                            pokemon={pokemon}
                            pokemonName={pokemon.name}
                            pokemonImage={pokemonImage}
                            pokemonAbilities={pokemonAbilities}
                            pokemonStats={pokemonStats}
                            pokemonSpecies={pokemonSpecies}
                            pokemonHeight={pokemon.height}
                            pokemonWeight={pokemon.weight}
                            pokemonEvolutionOne={evolutionOne}
                            totalEvolutionsMedia={totalEvolutionsMedia}
                            totalEvolutionsFinal={totalEvolutionsFinal}
                        />

                        
                    </Box>

                    {dataEvolution == null ?
                        <Box display="flex" direction="column" justifyContent="right" alignItems="right" >
                        <Link underline='none' href='/home'><button><HomeRoundedIcon sx={{ fontSize: 'large', width: '20px', height: '20px' }} /></button>
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

