const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.EXPRESS_SERVER_PORT,
  DB_USER : process.env.DB_USER,
  DB_PASSWORD : process.env.DB_PASSWORD,
  DB_HOST : process.env.DB_HOST,
  DB_SERVER : process.env.DB_SERVER,
  DB_PORT : process.env.DB_PORT
};