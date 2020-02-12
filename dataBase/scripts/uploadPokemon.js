const { query } = require("../index.js");
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

async function uploadPokemon() {
  try {
    const data = await readFile(
      "/Users/Tao/SchoolofCode/Projects/week3/pokedex/pokedex-taosharma/pokedex.json"
    );
    const pokemon = JSON.parse(data);

    const { pkdx_id, name, description, img_url, types, evolutions } = pokemon;

    for (let i = 0; i <= pokemon.length; i++) {
      const {
        pkdx_id,
        name,
        description,
        img_url,
        types,
        evolutions
      } = pokemon[i];
      const response = await query(
        `INSERT INTO pokemon (
        pkdx_id, 
        name, 
        description, 
        img_url, 
        types, 
        evolutions
        ) 
    VALUES ($1, $2, $3, $4, $5, $6)`,
        [pkdx_id, name, description, img_url, types, evolutions]
      );
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}

uploadPokemon();
