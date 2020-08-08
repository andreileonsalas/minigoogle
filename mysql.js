const mysql = require("mysql");

// Credenciales
// module.exports = mysql.createPool({
//   host: "bases.plataformaelectronicacr.com",
//   user: "bases",
//   password: "Bases@123",
//   database: "pruebaLectura"
// });

module.exports = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "bases_progra2"
});
