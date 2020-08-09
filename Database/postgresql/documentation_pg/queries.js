const {Pool, Client} = require("pg");
const pool = new Pool();

const query = {
  text: 'SELECT $1::text AS first_name, $2::text AS last_name', // this is incorrect in document!
  values: ['Jackie Chan', 'Bruce Lee'],
  rowMode: 'array'
};

// callback
pool.query(query, (err, res) => {
  if (err) {
    throw err;
  }
  console.log(res.fields.map(f => f.name));
  console.log(res.rows[0]);
  pool.end();
});

// // promise
// pool.query(query)
// .then(res => {
//   console.log(res.fields.map(f => f.name));
//   console.log(res.rows[0]);
// })
// .catch(err => console.log(err));

// async/await
(async () => {
  try {
    const res = await pool.query(query);
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err);
  }
})();
