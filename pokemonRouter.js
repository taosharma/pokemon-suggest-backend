const express = require("express");
const router = express.Router();
const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
  deletePokemonById,
  savePokemon
} = require("./pokemon.js");

router.get("/pokemon", async (request, response) => {
  const { name, id, search, deletePokemon } = request.query;

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

  if (deletePokemon) {
    const deletedPokemon = await deletePokemonById(deletePokemon);
    response.send(
      `You have deleted ${deletePokemon} from the pokedex. You are the real monster`
    );
    return;
  }

  const pokemon = await getPokemon();
  response.json(pokemon);
});

router.post("/pokemon", async (request, response) => {
  const { body } = request;
  await savePokemon(body);
  response.send(`you have saved ${body} as a pokemon.`);
});

module.exports = router;
