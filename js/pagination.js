import { fetchPokemonList } from './api.js';
import { renderPokemonList } from './renderPokemon.js';
import { state, pageCache } from './main.js';

let prevBtn, nextBtn, pageNumbersContainer;

export async function fetchPokemonPage(page = 1) {
  const container = document.getElementById('pokemon-container');
  const pagination = document.getElementById('pagination');
  container.innerHTML = '';

  function showPagination(show) {
    if (pagination) pagination.style.display = show ? 'flex' : 'none';
  }

  async function renderResults(results) {
    if (!results || results.length === 0) {
      container.innerHTML = '<p>Não há Pokémon para mostrar.</p>';
      showPagination(false);
      return false;
    }
    await renderPokemonList(results);
    showPagination(true);
    state.currentPage = page;
    renderPagination();
    return true;
  }

  function getPageFromCache(mode) {
    return pageCache[mode][page];
  }

  if (state.mode === 'TYPE') {
    const allTypePokemons = state.typeResults;
    state.totalItems = allTypePokemons.length;

    const cached = getPageFromCache('TYPE');
    if (cached) return await renderResults(cached);

    const start = (page - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    const pagedResults = allTypePokemons.slice(start, end);

    pageCache.TYPE[page] = pagedResults;
    return await renderResults(pagedResults);
  }

  const cachedAll = getPageFromCache('ALL');
  if (cachedAll) return await renderResults(cachedAll);

  try {
    const offset = (page - 1) * state.itemsPerPage;
    const data = await fetchPokemonList(state.itemsPerPage, offset);
    state.totalItems = data.count;

    pageCache.ALL[page] = data.results || [];
    await renderResults(data.results || []);
  } catch (error) {
    console.error('Erro ao carregar Pokémon:', error);
    container.innerHTML = '<p>Erro ao carregar os Pokémon. Tente novamente.</p>';
    showPagination(false);
  }
}


function renderPagination() {
  if (!prevBtn || !nextBtn || !pageNumbersContainer) return;

  const totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
  
  prevBtn.disabled = state.currentPage === 1;
  nextBtn.disabled = state.currentPage === totalPages;
  pageNumbersContainer.innerHTML = '';

  const maxPagesToShow = 3;
  let startPage = Math.max(1, state.currentPage - 1);
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === state.currentPage) btn.classList.add('active');

    btn.addEventListener('click', () => {
      state.currentPage = i;
      fetchPokemonPage(state.currentPage);
    });

    pageNumbersContainer.appendChild(btn);
  }

  prevBtn.disabled = state.currentPage === 1;
  nextBtn.disabled = state.currentPage === totalPages;
}

document.addEventListener('DOMContentLoaded', () => {
  prevBtn = document.getElementById('prev-btn');
  nextBtn = document.getElementById('next-btn');
  pageNumbersContainer = document.getElementById('page-numbers');

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.currentPage > 1) {
      state.currentPage--;
      fetchPokemonPage(state.currentPage);
    }
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
    if (state.currentPage < totalPages) {
      state.currentPage++;
      fetchPokemonPage(state.currentPage);
    }
  });

});


