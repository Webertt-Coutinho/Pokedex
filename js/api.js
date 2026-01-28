export async function fetchPokemonList(limit, offset) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Falha ao buscar lista de Pokémon');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { count: 0, results: [] };
  }
}

export async function fetchPokemonInfo(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error('Pokémon não encontrado');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null; 
  }
}

export async function fetchPokemonTypes() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type`);
    if (!response.ok) throw new Error('Tipo não encontrado');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null; 
  }
}

export async function fetchTypeByName(typeName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
    if (!response.ok) throw new Error('Tipo não encontrado');

    const data = await response.json();

    return data.pokemon.map(p => p.pokemon);
  } catch (error) {
    console.error(error);
    return [];
  }
}
