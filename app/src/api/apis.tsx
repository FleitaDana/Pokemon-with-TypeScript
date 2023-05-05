import baseURL from "./baseUrl";


const getPokemones = (page: number) => baseURL.get(`/pokemon/?offset=${(page-1)*21}&limit=20`)
const getPokemonesById = (id: number) => baseURL.get(`/pokemon/${id}`)
const getPokemonesByName = (name: string | undefined) => baseURL.get(`/pokemon/${name}`)
const getSpeciesPokemon = (id: number) => baseURL.get(`/pokemon-species/${id}`)
const getEvolutions = (evoId: number) => baseURL.get(`/evolution-chain/${evoId}`)

export{
    getPokemones,
    getPokemonesById,
    getPokemonesByName,
    getSpeciesPokemon,
    getEvolutions,
}