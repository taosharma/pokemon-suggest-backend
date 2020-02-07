const express = require("express");
const app = express();
const PORT = 5000;
const { getPokemon, getPokemonById } = require("./pokemon.js");

app.get("/pokemon", async (request, response) => {
  const pokemon = await getPokemon();
  response.json(pokemon);
});

app.get("/pokemon/:pokemonid", async (request, response) => {
  const { pokemonid } = request.params;
  const pokemon = await getPokemonById(pokemonid);
  response.json(pokemon);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
