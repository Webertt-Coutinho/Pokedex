export async function fetchPokemonList(limit, offset) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
  const data = await response.json();

  return data;
}

export async function fetchPokemonInfo(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await response.json();
  return data;
}