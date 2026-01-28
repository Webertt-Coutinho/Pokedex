# Pokedex

Aplicação web que consome a PokeAPI para listar, pesquisar e visualizar Pokémons,
com paginação, cache em memória e interface responsiva.

A aplicação não realiza reload de página.
Toda atualização visual é realizada através da manipulação do DOM, onde o container de Pokémon é limpo e re-renderizado conforme o estado da aplicação muda (paginação ou busca).

## Funcionalidades
- Listagem paginada de Pokémon
- Busca por nome
- Filtragem por tipo (Grama, Elétrico, etc.)
- Cache em memória por página
- Reset da busca para lista completa
- Cores por tipo de Pokémon
- Interface responsiva para desktop e mobile

## Tecnologias
- HTML5
- CSS3
- JavaScript
- PokeAPI

## Estrutura do Projeto

```text
src/
├── api.js              # Comunicação com a PokeAPI
├── main.js             # Inicialização da aplicação
├── pagination.js       # Controle de paginação e cache
├── renderPokemon.js    # Renderização dos cards
├── search.js           # Lógica de busca
├── typeColors.js       # Mapeamento de cores por tipo
├── filter.js           # Filtro por tipo
```

## Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/Webertt-Coutinho/pokedex.git
```
2. Abra o arquivo index.html no navegador ou utilize o Live Server

## Decisões Técnicas

### Cache em memória
Foi implementado um cache simples (`pageCache`) para armazenar
os resultados das páginas já visitadas, evitando chamadas repetidas
à API.

O cache não é persistido (localStorage) por não ser necessário
manter dados entre reloads.

### Paginação manual
A paginação é controlada via `limit` e `offset` da PokeAPI,
com controle de estado da página atual e renderização dinâmica
dos botões.

### Separação de responsabilidades
- `api.js`: comunicação com API
- `pagination.js`: regras de navegação
- `renderPokemon.js`: apenas renderização
- `search.js`: fluxo de busca

## Melhorias Futuras
- Internacionalização (pt-BR)
- Skeleton loader durante carregamento
- Pesquisa por filtros, por exemplo Tipo (Grama, Eletrico)
- Pesquisa com filtros (ex: tipo — Grama, Elétrico)
