const {Pool} = require("pg");

const pool = new Pool();

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// callback - checkout a client
pool.connect((err, client, done) => {
  if (err) {
    throw err;
  }
  client.query('SELECT * FROM users WHERE id = $1', [1], (err, res) => {
    done();

    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
});

// promise - checkout a client
pool
  .connect()
  .then(client => {
    return client
             .query('SELECT * FROM users WHERE id = $1', [1])
             .then(res => {
               client.release();
               console.log(res.rows[0]);
             })
             .catch(err => {
               client.release();
               console.log(err.stack);
             });
  });

// async/await - checkout a client
;(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users WHERE id = $1', [1]);
    console.log(res.rows[0]);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
})().catch(err => console.log(err.stack));

// shutdown
;(async () => {
  console.log('starting async query');
  const result = await pool.query('SELECT NOW()');
  console.log('async query finished');

  console.log('starting callback query');
  pool.query('SELECT NOW()', (err, res) => {
    console.log('callback query finished');
  });

  console.log('calling end');
  await pool.end();
  console.log('pool has drained');
})()
