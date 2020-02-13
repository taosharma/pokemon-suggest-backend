const express = require("express");
const router = express.Router();
const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
  deletePokemonById,
  savePokemon,
  updatePokemonName
} = require("../models/pokemon.js");

router.get("/pokemon", async (request, response) => {
  const { name, id, search } = request.query;

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

  const pokemon = await getPokemon();
  response.json(pokemon);
});

router.post("/pokemon", async (request, response) => {
  const { body } = request;
  console.log(body);
  const name = await savePokemon(body);
  response.send(`you have saved ${name} as a pokemon.`);
});

router.delete("/pokemon/:id", async (request, response) => {
  const { id } = request.params;
  const name = await deletePokemonById(id);
  if (name) {
    response
      .status(200)
      .send(
        `You have deleted ${name} from the pokedex. You are the real monster.`
      );
    return;
  } else
    response
      .status(406)
      .send(
        `You have already deleted that pokemon from the pokedex. You are still the real monster.`
      );
  return;
});

router.patch("/pokemon/:id", async (request, response) => {
  const { body } = request;
  const { id } = request.params;
  await updatePokemonName(body, id);
  response.send(`You have updated a pokemon`);
});

module.exports = router;
