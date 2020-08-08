const {Pool, Client} = require("pg");

// pools will use environmental variables
// for connection information
const pool = new Pool();

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

// // The async/await way.
(async () => {
  const res = await pool.query('SELECT NOW()');
  console.log(res.rows[0].now);
  await pool.end();
})();

// clients will also use environmental variables
// for connection information
const client = new Client();

(async () => {
  await client.connect();

  const res = await client.query('SELECT NOW()');
  await client.end();
})();

// Also possible through programmatic, as is with the tutorial.
// Also connectionString thanks to dyno's Heroku
