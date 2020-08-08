// Getting started
const {Client} = require("pg");
require("dotenv").config();
const client = new Client({
  user: process.env.REACT_APP_USER_KEY,
  database: process.env.REACT_APP_DATABASE_KEY,
  password: process.env.REACT_APP_PASSWORD_KEY
});

;(async () => {
  await client.connect();

  const res = await client.query('SELECT $1::text as message', ['Hello world']);
  console.log(res.rows[0].message);
  await client.end();
})()

// // callbacks, same as above
// client.connect();
//
// client.query('SELECT $1::text as message', ['Hello world'], (error, result) => {
//   console.log(error?error.stack : result.rows[0].message);
//   client.end();
// });
