const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

async function getPokemon() {
  const data = await readFile("./pokedex.json");
  const pokemon = JSON.parse(data);
  return pokemon;
}

async function getPokemonById(id) {
  const pokemon = await getPokemon();
  return pokemon.find(item => item.pkdx_id == id);
}

async function getPokemonByName(name) {
  const pokemon = await getPokemon();
  return pokemon.find(item => item.name.toLowerCase() == name.toLowerCase());
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName
};
