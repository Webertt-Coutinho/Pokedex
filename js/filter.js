import { fetchPokemonTypes, fetchTypeByName } from './api.js';
import { state, pageCache} from './main.js';
import { fetchPokemonPage } from './pagination.js';

export async function initTypeFilter() {
  const container = document.querySelector('.filter-container');
  if (!container) return;

  const select = document.createElement('select');
  select.id = 'typeFilter';
  select.classList.add('type-select');
  container.appendChild(select);

  const data = await fetchPokemonTypes();
  if (!data) return;

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Todos os tipos';
  select.appendChild(defaultOption);

  data.results.forEach(type => {
    const option = document.createElement('option');
    option.value = type.name;
    option.textContent = type.name;
    select.appendChild(option);
  });

  select.addEventListener('change', async () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    const type = select.value;

    state.currentPage = 1;

    if (!type) {
      state.mode = 'ALL';
      state.typeResults = [];
      fetchPokemonPage(1);
      return;
    }

    state.mode = 'TYPE';
    pageCache.TYPE = {};

    const data = await fetchTypeByName(type);

    state.typeResults = data;
    state.totalItems = state.typeResults.length;
    fetchPokemonPage(1);
  });
}