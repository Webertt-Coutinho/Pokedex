import {fetchPokemonInfo} from './api.js'
import {typeColors} from './typeColors.js'

export async function renderPokemonList(list) {
  const container = document.getElementById('pokemon-container');
  if (!container) return;

  const promises = list.map(p => fetchPokemonInfo(p.name));
  const results = await Promise.all(promises);

  const fragment = document.createDocumentFragment();

  results.forEach((data) => {
    if (data) {
      const card = createPokemonCard(data); 
      fragment.appendChild(card);
    }
  });

  container.innerHTML = ''; 
  container.appendChild(fragment); 
}

function createPokemonCard(data) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';

  const sprite = data.sprites.other.dream_world.front_default || data.sprites.front_default;
  const type = data.types[0].type.name;
  const id = data.id;

  card.innerHTML = `
    <div class="pokemon-header">
      <span class="pokemon-type" style="color: ${typeColors[type] || '#777'};">${type}</span>
      <span class="pokemon-number">#${id}</span>
    </div>
    <div class="pokemon-body">
      <img src="${sprite}" alt="${data.name}" class="pokemon-image" loading="lazy" />
      <div class="pokemon-name">${data.name}</div>
    </div>
  `;

  return card;
}
export async function renderPokemonSearch(name) {
  const container = document.getElementById('pokemon-container');
  const pagination = document.getElementById('pagination');
  container.innerHTML = '';
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'flex';


  try {
    const data = await fetchPokemonInfo(name.toLowerCase());
    if (!data) throw new Error('Pokémon não encontrado');

    const card = await createPokemonCard(data);
    container.appendChild(card);

    if (pagination) pagination.style.display = 'none';
  } catch (err) {
    container.innerHTML = '<p>Pokémon não encontrado!</p>';
    if (pagination) pagination.style.display = 'none';
  } finally {
    if (loading) loading.style.display = 'none';
  }
}
