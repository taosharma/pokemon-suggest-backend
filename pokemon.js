const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

async function getPokemon() {
  const data = await readFile("./pokedex.json");
  const pokemon = JSON.parse(data);
  return pokemon;
}

module.exports = {
  getPokemon
};
