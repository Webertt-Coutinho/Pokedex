import {fetchPokemonInfo} from './api.js'

export function renderPokemonList(list) {
  const container = document.getElementById('pokemon-container');
  if (!container) return;

  container.innerHTML = ''; 

  list.forEach(async (pokemon) => {
    const data = await fetchPokemonInfo(pokemon.name);
    const sprite = data.sprites.other.dream_world.front_default;
    const type = data.types[0].type.name; 
    const id = data.id;

    const card = document.createElement('div');
    card.className = 'pokemon-card';

    card.innerHTML = `
      <div class="pokemon-header">
        <span class="pokemon-type">${type}</span>
        <span class="pokemon-number">#${id}</span>
      </div>
      <div class="pokemon-body">
        <img src="${sprite}" alt="${pokemon.name}" class="pokemon-image" />
        <div class="pokemon-name">${pokemon.name}</div>
      </div>
    `;

    container.appendChild(card);
  });
}
