const {Pool} = require("pg");
require("dotenv").config();
const pool = new Pool({
  user: process.env.REACT_APP_USER,
  host: process.env.REACT_APP_HOST,
  database: process.env.REACT_APP_DATABASE,
  password: process.env.REACT_APP_PASSWORD,
  port: Number(process.env.REACT_APP_PORT)
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY users.id ASC', (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE users.id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const createUser = (request, response) => {
  const {name, email} = request.body;

  pool.query('INSERT INTO users(name, email) VALUES($1, $2)', [name, email], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${result.insertId}`);
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const {name, email} = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    });
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'DELETE FROM users WHERE users.id = $1',
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
