const { Pool } = require("pg");

const pool = new Pool({
  user: `postgres`,
  host: `35.190.217.161`,
  database: `postgres`,
  password: `mdvBBcrjHeukliyf`
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
