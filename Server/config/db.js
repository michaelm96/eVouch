const mysql = require("mysql2/promise");

let conn = mysql.createPool({
  port: 3306,
  host: "127.0.0.1",
  database: "voucher",
  user: "root",
  password: "password",
});

module.exports = conn;
