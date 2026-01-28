import {fetchPokemonInfo} from './api.js'
import { fetchPokemonPage } from './pagination.js';

export async function renderPokemonList(list) {
  const container = document.getElementById('pokemon-container');
  if (!container) return;
  container.innerHTML = '';

  const promises = list.map(p => fetchPokemonInfo(p.name));
  const results = await Promise.all(promises);
  results.forEach(data => {
    if (data) container.appendChild(createPokemonCard(data));
  });
}

function createPokemonCard(data) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  console.log(data)

  const sprite = data.sprites.other.dream_world.front_default;
  const type = data.types[0].type.name;
  const id = data.id;

  card.innerHTML = `
    <div class="pokemon-header">
      <span class="pokemon-type">${type}</span>
      <span class="pokemon-number">#${id}</span>
    </div>
    <div class="pokemon-body">
      <img src="${sprite}" alt="${data.name}" class="pokemon-image" />
      <div class="pokemon-name">${data.name}</div>
    </div>
  `;

  return card;
}

export async function renderPokemonSearch(name) {
  const container = document.getElementById('pokemon-container');
  const pagination = document.getElementById('pagination-container');
  container.innerHTML = '';

  if (!name) {
    fetchPokemonPage(1);
    return;
  }

  try {
    const data = await fetchPokemonInfo(name.toLowerCase());
    if (!data) throw new Error('Pokémon não encontrado');

    const card = createPokemonCard(data);
    container.appendChild(card);

    if (pagination) pagination.style.display = 'none';
  } catch (err) {
    container.innerHTML = '<p>Pokémon não encontrado!</p>';
    if (pagination) pagination.style.display = 'none';
  }
}
