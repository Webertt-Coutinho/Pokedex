import { fetchPokemonList } from './api.js';
import { renderPokemonList } from './renderPokemon.js';
import { state, pageCache } from './main.js';

let prevBtn = document.getElementById('prev-btn');
let nextBtn = document.getElementById('next-btn');
let pageNumbersContainer = document.getElementById('page-numbers');

export async function fetchPokemonPage(page = 1) {
  const container = document.getElementById('pokemon-container');
  const pagination = document.getElementById('pagination');
  const loading = document.getElementById('loading');

  if (loading) loading.style.display = 'flex';
  container.innerHTML = '';

  try {
    let results = [];
    const mode = state.mode;

    if (pageCache[mode][page]) {
      results = pageCache[mode][page];
    } else if (mode === 'TYPE') {
      const start = (page - 1) * state.itemsPerPage;
      results = state.typeResults.slice(start, start + state.itemsPerPage);
      pageCache.TYPE[page] = results;
    } else {
      const offset = (page - 1) * state.itemsPerPage;
      const data = await fetchPokemonList(state.itemsPerPage, offset);
      state.totalItems = data.count;
      results = data.results || [];
      pageCache.ALL[page] = results;
    }

    if (!results || results.length === 0) {
      container.innerHTML = '<p>Não há Pokémon para mostrar.</p>';
      if (pagination) pagination.style.display = 'none';
    } else {
      await renderPokemonList(results, container); 
      if (pagination) pagination.style.display = 'flex';
      state.currentPage = page;
      renderPagination();
    }

  } catch (error) {
    console.error('Erro ao carregar página:', error);
    container.innerHTML = '<p>Erro ao carregar os Pokémon. Tente novamente.</p>';
    if (pagination) pagination.style.display = 'none';
  } finally {
    if (loading) loading.style.display = 'none';
  }
}

function renderPagination() {
  if (!prevBtn || !nextBtn || !pageNumbersContainer) return;

  const totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
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
    btn.onclick = () => fetchPokemonPage(i);
    pageNumbersContainer.appendChild(btn);
  }

  prevBtn.disabled = state.currentPage === 1;
  nextBtn.disabled = state.currentPage === totalPages || totalPages === 0;
}

prevBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  if (state.currentPage > 1) fetchPokemonPage(state.currentPage - 1);
});

nextBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  const totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
  if (state.currentPage < totalPages) fetchPokemonPage(state.currentPage + 1);
});