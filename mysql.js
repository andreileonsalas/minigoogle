const mysql = require("mysql");

// Credenciales
// module.exports = mysql.createPool({
//   host: "bases.plataformaelectronicacr.com",
//   user: "bases",
//   password: "Bases@123",
//   database: "pruebaLectura"
// });

module.exports = mysql.createPool({
  host: "plataformaelectronicacr.com",
  user: "Bases",
  password: "Bases@123",
  database: "bases_Progra2"
});
