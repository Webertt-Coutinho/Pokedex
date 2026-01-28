import { renderPokemonSearch } from './renderPokemon.js';
import { fetchPokemonPage } from './pagination.js';

export let isSearching = false;

export function searchPokemon() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('search-button');

  const handleSearch = async () => {
    const name = searchInput.value.trim().toLowerCase();

    if (!name) {
      fetchPokemonPage(1);
      isSearching = false;
      return;
    }

    isSearching = true;
    renderPokemonSearch(name);
  };

  searchBtn?.removeEventListener('click', handleSearch);
  searchInput?.removeEventListener('keypress', handleSearch);
  
  searchBtn?.addEventListener('click', handleSearch);
  searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}