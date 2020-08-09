// must be called with client, NOT POOL.QUERY, per Postgres design BEGIN/ COMMIT / ROLLBACK
const {Pool} = require('pg');
const pool = new Pool();

// callbacks
pool.connect((err, client, done) => {
  
});
