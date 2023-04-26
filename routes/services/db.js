    const { DB_USER, DB_HOST, DB_SERVER, DB_PASSWORD, DB_PORT } = require('../../server/config');
    const Pool = require('pg').Pool;
    const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_SERVER,
    password: DB_PASSWORD,
    port: DB_PORT,
    });
module.exports = pool;