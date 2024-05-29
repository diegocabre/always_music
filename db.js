// db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // Reemplaza con tu usuario de PostgreSQL
  host: "localhost",
  database: "always_music",
  password: '123456', // Reemplaza con tu contraseña de PostgreSQL
  port: 5433,
});

module.exports = pool;
