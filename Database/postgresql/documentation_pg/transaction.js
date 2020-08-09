// must be called with client, NOT POOL.QUERY, per Postgres design BEGIN/ COMMIT / ROLLBACK
const {Pool} = require('pg');
const pool = new Pool();

// callbacks
pool.connect((err, client, done) => {
  const shouldAbort = err => {
    if (err) {
      console.error('Error in transaction', err.stack);
      client.query('ROLLBACK', err => {
        if (err) {
          console.error('Error rolling back client', err.stack);
        }
        done(); // Return client back to the pool
      });
    }
    return !!err;
  };

  client.query('BEGIN', err => {
    if(shouldAbort(err)) return;
    const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id';
    client.query(queryText, ['brianc'], (err, res) => {
      if (shouldAbort(err)) return;

      const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES($1, $2)';
      const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo'];
      client.query(insertPhotoText, insertPhotoValues, (err, res) => {
        if (shouldAbort(err)) return;

        client.query('COMMIT', err => {
          if (err) {
            console.error('Error committing transaction', err.stack);
          }
          done();
        });
      });
    });
  });
});

// pooled client with async/await
;(async () => {
  // note: we don't try/catch this because if connecting throws an exception
  // it will be catched outside and the value is undefined!
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id';
    const res = await client.query(queryText, ['brianc']);

    const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES($1, $2)';
    const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo'];
    await client.query(insertPhotoText, insertPhotoValues);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
})().catch(e => console.log(e.stack))
