const conexion = require("mysql");

module.exports = {
    // insertar(nombre, precio) {
    //     return new Promise((resolve, reject) => {
    //         conexion.query(`insert into productos
    //         (nombre, precio)
    //         values
    //         (?, ?)`,
    //             [nombre, precio], (err, resultados) => {
    //                 if (err) reject(err);
    //                 else resolve(resultados.insertId);
    //             });
    //     });
    // },

    obtenerTodos() {
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT * FROM pruebaDatos`
                , (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    }

}
