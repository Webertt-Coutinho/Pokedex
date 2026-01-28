import { fetchPokemonPage } from './pagination.js';

async function init() {
  fetchPokemonPage(1);
}

init();