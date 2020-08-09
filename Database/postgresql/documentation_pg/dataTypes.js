// Data Types
const {Pool, Client} = require("pg");
const pool = new Pool();
const client = new Client();
// string, fresh, unparsed
const queryText = 'SELECT int_col::text, date_col::text, json_col::text FROM my_table';
const result = await client.query(queryText);

console.log(result.rows[0]); // will contain unparse string from each column.

// uuid+json/jsonb
const createTableText = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TEMP TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);
`;

// create our temp table
await client.query(createTableText);

const newUser = {email: 'son.to@gmail.com'};
// create a new user
await client.query('INSERT INTO users(data) VALUES($1)', [newUser]);

const { rows } = await client.query('SELECT * FROM users');

console.log(rows);
/*
output:
[{
  id: 'd70195fd-608e-42dc-b0f5-eee975a621e9',
  data: {email: 'son.to@gmail.com'}
}]
*/

// date/timestamp/timestamptz
const createTableText = `
CREATE TEMP TABLE  dates(
  date_col DATE,
  timestamp_col TIMESTAMP,
  timestamptz_col TIMESTAMPTZ
);
`;

// create our temp table
await client.query(createTableText);

// insert the current time into it
const now = new Date();
const insertText = 'INSERT INTO dates(date_col, timestamp_col, timestamptz_col) VALUES ($1, $2, $3)';
await client.query(insertText, [now, now, now]);

// read the row back out
const result = await client.query('SELECT * FROM dates');

console.log(result.rows);
