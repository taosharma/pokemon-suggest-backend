const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function getPokemon() {
  const data = await readFile("./pokedex.json");
  const pokemon = JSON.parse(data);
  return pokemon;
}

async function savePokemon(pokemon) {
  const pokemonArray = await getPokemon();
  const newArray = [...pokemonArray, pokemon];
  await writeFile("./pokedex.json", JSON.stringify(newArray));
}

async function getPokemonById(id) {
  const pokemon = await getPokemon();
  return pokemon.find(item => item.pkdx_id == id);
}

async function getPokemonByName(name) {
  const pokemon = await getPokemon();
  return pokemon.find(item => item.name.toLowerCase() == name.toLowerCase());
}

async function searchPokemonByName(search) {
  const pokemon = await getPokemon();
  return pokemon.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
}
async function searchPokemonByType(types) {
  const pokemon = await getPokemon();
  return pokemon.filter(item =>
    item.types
      .toLowerCase()
      .filter(item => item.types.toLowerCase().includes(types.toLowerCase()))
  );
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
  searchPokemonByType,
  savePokemon
};