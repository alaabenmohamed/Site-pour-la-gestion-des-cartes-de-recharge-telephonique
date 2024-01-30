const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.MDP,
  host: "localhost",
  port: process.env.PORT,
  database: "nassim",
});
// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// });
module.exports = pool;
