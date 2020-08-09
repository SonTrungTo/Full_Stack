const {Pool, Client} = require("pg");
const pool = new Pool();

const query = {
  text: 'SELECT $1::text AS first_name, SELECT $2::text AS last_name',
  values: ['Jackie Chan', 'Bruce Lee'],
  rowMode: 'array'
}

// callback
pool.query(query);
