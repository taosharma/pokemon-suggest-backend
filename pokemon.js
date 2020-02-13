const { query } = require("./dataBase/index.js");

async function getPokemon() {
  const data = await query(`SELECT * FROM pokemon`);
  return data.rows;
}

async function savePokemon(pokemonInput) {
  const {
    pkdx_id,
    name,
    description,
    img_url,
    types,
    evolutions
  } = pokemonInput;

  const data = await query(
    `INSERT INTO pokemon (
    pkdx_id,
    name,
    description,
    img_url,
    types,
    evolutions) VALUES ($1, $2, $3, $4, $5, $6)`,
    [pkdx_id, name, description, img_url, types, evolutions]
  );
  return data.rows[0].name;
}

async function getPokemonById(id) {
  const data = await query(`SELECT * FROM pokemon WHERE id=$1`, [id]);
  return data.rows[0];
}

async function getPokemonByName(name) {
  const data = await query(`SELECT * FROM pokemon WHERE name ILIKE $1`, [name]);
  return data.rows[0];
}

async function searchPokemonByName(name) {
  const data = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%'`,
    [name]
  );
  return data.rows;
}

async function deletePokemonById(id) {
  const data = await query(`DELETE FROM pokemon WHERE id=$1 RETURNING name`, [
    id
  ]);
  console.log(data.rowCount);
  if (data.rowCount) {
    return data.rows[0].name;
  } else {
    return undefined;
  }
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
  deletePokemonById,
  savePokemon
};
