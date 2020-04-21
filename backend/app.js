const express = require("express");
const app = express();
const PORT = 5000;
const pokemonRouter = require("./routes/pokemon");

app.use((request, response, next) => {
  console.log(`${request.method} request received to ${request.url}`);
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use(pokemonRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
