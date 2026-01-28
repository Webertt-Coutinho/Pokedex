import { renderPokemonSearch } from './renderPokemon.js';
import { fetchPokemonPage } from './pagination.js';

export function searchPokemon() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('search-button');
  const allBtnContainer = document.getElementById('all-btn-container');
  const allBtn = document.getElementById('all-btn');

  const handleSearch = async () => {
    const typeSelect = document.getElementById('typeFilter');
    if (typeSelect) typeSelect.value = '';

    const name = searchInput.value.trim().toLowerCase();

    if (!name) {
      fetchPokemonPage(1);
      return;
    }

    allBtnContainer.style.display = 'block';
    renderPokemonSearch(name);
  };

  searchBtn?.addEventListener('click', handleSearch);
  searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  allBtn.addEventListener('click', () => {
    allBtnContainer.style.display = 'none';
    searchInput.value = '';
    fetchPokemonPage(1); 
  });
  
}