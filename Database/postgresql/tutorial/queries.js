const {Pool} = require("pg");
require("dotenv").config();
const pool = new Pool({
  user: process.env.REACT_APP_USER,
  host: process.env.REACT_APP_HOST,
  database: process.env.REACT_APP_DATABASE,
  password: process.env.REACT_APP_PASSWORD,
  port: Number(process.env.REACT_APP_PORT)
});
