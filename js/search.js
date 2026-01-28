import { renderPokemonSearch } from './ui.js';

export function searchPokemon() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('search-button');

  const handleSearch = async () => {
    const name = searchInput.value.trim().toLowerCase();
    renderPokemonSearch(name);
  };

  searchBtn?.removeEventListener('click', handleSearch);
  searchInput?.removeEventListener('keypress', handleSearch);
  
  searchBtn?.addEventListener('click', handleSearch);
  searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}