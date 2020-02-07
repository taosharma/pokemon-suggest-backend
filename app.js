const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", async (request, response) => {
  response.send("all good");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
