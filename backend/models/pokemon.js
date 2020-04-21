const { query } = require("../dataBase/index.js");

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

  return pokemonInput.name;
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
  if (data.rowCount) {
    return data.rows[0].name;
  } else {
    return undefined;
  }
}

async function replacePokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;

  const oldData = await query(`SELECT name FROM pokemon WHERE id=$1`, [id]);

  const result = await query(
    `UPDATE pokemon SET
      pkdx_id = $1,
      name = $2,
      description = $3,
      img_url = $4,
      types = $5,
      evolutions = $6
      WHERE id = $7
      RETURNING name`,
    [pkdx_id, name, description, img_url, types, evolutions, id]
  );

  return oldData.rows[0].name;
}

async function updatePokemonName(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;
  const data = await query(
    `UPDATE pokemon SET 
    pkdx_id = COALESCE($1, pkdx_id),
      name = COALESCE($2, name),
      description = COALESCE($3, description),
      img_url = COALESCE($4, img_url),
      types = COALESCE($5, types),
      evolutions = COALESCE($6, evolutions)
      WHERE id = $7 
      RETURNING name`,
    [pkdx_id, name, description, img_url, types, evolutions, id]
  );
  return data.rows[0].name;
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
  deletePokemonById,
  updatePokemonName,
  savePokemon,
  replacePokemon
};
