const util = require("util");
var mysql = require("mysql");
const config = require('../env.js');

var connect = mysql.createPool({
  connectionLimit: 10,
  host: config.host_db,
  user: config.user_db,
  password: config.pass,
  database: config.db,
  multipleStatements: true,
});

connect.on("relase", () => {
  console.log("connection %d relase", connection.threadId);
});

connect.query = util.promisify(connect.query);

module.exports = connect;
