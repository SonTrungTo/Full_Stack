const config = {
  database: 'database-name',
  host: 'host-or-ip',
  //this object will be passed to the TLSSocket constructor
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
    key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
    cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString()
  }
};

import {Client, Pool} from 'pg';

const client = new Client(config);
client.connect(err => {
  if (err) {
    console.err('error connecting', err.stack);
  } else {
    console.log('connected');
    client.end();
  }
});

const pool = new Pool(config);
pool.connect()
.then(client => {
  console.log("connected");
  client.release();
})
.catch(err => console.err('error connecting', err.stack))
.then(() => pool.end());
