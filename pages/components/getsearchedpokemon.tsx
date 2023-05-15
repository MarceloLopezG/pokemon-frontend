import axios from "axios";

const url = 'http://localhost:3000/pokemon/filter';

// Get the entire list of pokemon or get only the pokemon list searched by pokemonName.
const GetSearchedPokemon = async (page: number, size: number, pokemonName: string) => {
  const response = await axios.post(url, {
    pokemonName: pokemonName,
    page: page,
    size: size
  }).then(resp => {
    return resp.data;
  }).catch((err) => {
    return [];
  });

  return response.result;

}


export default GetSearchedPokemon;
