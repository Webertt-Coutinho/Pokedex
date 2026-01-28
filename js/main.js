import { initTypeFilter } from './filter.js';
import { fetchPokemonPage } from './pagination.js';
import { searchPokemon } from './search.js'

export const state = {
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: 18,
  mode: 'ALL',
  typeResults: []
};

export const pageCache = {
  ALL: {},
  TYPE: {}
}

document.addEventListener('DOMContentLoaded', () => {
  async function init() {
    searchPokemon();
    initTypeFilter()
    await fetchPokemonPage(1);
  }

  init();
});

