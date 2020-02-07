const express = require("express");
const router = express.Router();
const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
  searchPokemonByType
} = require("./pokemon.js");

router.get("/pokemon", async (request, response) => {
  const { name } = request.query;
  const { id } = request.query;
  const { search } = request.query;
  const { types } = request.query;
  if (name) {
    const namedPokemon = await getPokemonByName(name);
    response.json(namedPokemon);
    return;
  }
  if (id) {
    const idPokemon = await getPokemonById(id);
    response.json(idPokemon);
    return;
  }
  if (search) {
    const searchName = await searchPokemonByName(search);
    response.json(searchName);
    return;
  }
  if (types) {
    const searchTypes = await searchPokemonByType(search);
    response.json(searchTypes);
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

router.post("/pokemon", (request, response) => {
  const { body } = request;
  console.log(body);
  response.send("you have made a pwost request");
});

module.exports = router;
