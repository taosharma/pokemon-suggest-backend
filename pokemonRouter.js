const express = require("express");
const router = express.Router();
const {
  getPokemon,
  getPokemonById,
  getPokemonByName
} = require("./pokemon.js");

router.get("/pokemon", async (request, response) => {
  const { name } = request.query;
  if (name) {
    const namedPokemon = await getPokemonByName(name);
    response.json(namedPokemon);
    return;
  }
  const pokemon = await getPokemon();
  response.json(pokemon);
});

// router.get("/pokemon/:id", async (request, response) => {
//   const { id } = request.params;
//   const pokemon = await getPokemonById(id);
//   response.json(pokemon);
// });

router.get("/pokemon/:name", async (request, response) => {
  const { name } = request.params;
  const pokemon = await getPokemonByName(name);
  response.json(pokemon);
});

module.exports = router;
