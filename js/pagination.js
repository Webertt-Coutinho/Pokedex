import { fetchPokemonList } from './api.js';
import { renderPokemonList } from './renderPokemon.js';

const itemsPerPage = 18;
let currentPage = 1;
let totalItems = 0;
let prevBtn, nextBtn, pageNumbersContainer;
const pageCache = {}

export async function fetchPokemonPage(page = 1) {
  const container = document.getElementById('pokemon-container');
  const pagination = document.getElementById('pagination');
  container.innerHTML = ''; 

  if (pageCache[page]) {
    await renderPokemonList(pageCache[page]);
    if (pagination) pagination.style.display = 'flex';
    currentPage = page;
    renderPagination();
    return;
  }

  try {
    const offset = (page - 1) * itemsPerPage;
    const data = await fetchPokemonList(itemsPerPage, offset);
    totalItems = data.count;
    
    if (!data || !data.results?.length) {
      container.innerHTML = '<p>Não há Pokémon para mostrar.</p>';
      if (pagination) pagination.style.display = 'none';
      return;
    }

    pageCache[page] = data.results;
    await renderPokemonList(data.results);

    if (pagination) pagination.style.display = 'flex';
    renderPagination();

  } catch (error) {
    console.error('Erro ao carregar Pokémon:', error);
    container.innerHTML = '<p>Erro ao carregar os Pokémon. Tente novamente.</p>';
    if (pagination) pagination.style.display = 'none';
  }
}

function renderPagination() {
  
  if (!prevBtn || !nextBtn || !pageNumbersContainer) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  pageNumbersContainer.innerHTML = '';

  const maxPagesToShow = 3;
  let startPage = Math.max(1, currentPage - 1);
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');

    btn.addEventListener('click', () => {
      currentPage = i;
      fetchPokemonPage(currentPage);
    });

    pageNumbersContainer.appendChild(btn);
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

document.addEventListener('DOMContentLoaded', () => {
  prevBtn = document.getElementById('prev-btn');
  nextBtn = document.getElementById('next-btn');
  pageNumbersContainer = document.getElementById('page-numbers');

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      fetchPokemonPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      fetchPokemonPage(currentPage);
    }
  });

});


