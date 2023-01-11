const { Pool } = require("pg");

const pool = new Pool({
  user: "test2",
  password: "test",
  host: "localhost",
  port: 5432,
  database: "dev_planner",
});

module.exports = pool;