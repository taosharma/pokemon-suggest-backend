const { query } = require("../index.js");

async function dropTable() {
  try {
    const response = await query(`DROP TABLE pokemon`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

dropTable();
