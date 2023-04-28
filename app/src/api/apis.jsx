import baseURL from "./baseUrl";

const getPokemones = (page) => baseURL.get(`/pokemon/?offset=${(page-1)*21}&limit=20`)
const getPokemonesById = (id) => baseURL.get(`/pokemon/${id}`)
const getPokemonesByName = (name) => baseURL.get(`/pokemon/${name}`)
const getSpeciesPokemon = (id) => baseURL.get(`/pokemon-species/${id}`)
const getEvolutions = (evoId) => baseURL.get(`/evolution-chain/${evoId}`)

export{
    getPokemones,
    getPokemonesById,
    getPokemonesByName,
    getSpeciesPokemon,
    getEvolutions,
}