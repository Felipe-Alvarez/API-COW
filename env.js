const dotenv = require('dotenv').config();

module.exports = {
    port: process.env.PUERTO,
    host_db: process.env.HOST_DB,
    user_db: process.env.USER,
    pass: process.env.PASSWORD,
    db: process.env.DATABASE
};