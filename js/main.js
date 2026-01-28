import { fetchPokemonPage } from './pagination.js';
import { searchPokemon } from './search.js'


async function init() {
  await fetchPokemonPage(1);
  searchPokemon();
}

init();