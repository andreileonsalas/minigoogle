const mariadb = require('mariadb')

mariadb.createConnection({
    user: "root",
    database: "db",
    host: "localhost",
    port: 3306
})

.then(conn => {
    console.log("Conexión exitosa");
    conn.end();
})

.catch(err=>{
    console.log("Error: "+ err.message);
});

/*

const mariadb = require('mariadb');
const pool = mariadb.createPool({host: 'mydb.com', user: 'myUser', connectionLimit: 5});
pool.getConnection()
    .then(conn => {
      conn.query("SELECT 1 as val")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          conn.end();
        })
    }).catch(err => {
      //not connected
    });

    */

//Insert
conn.query(
    "CREATE TEMPORARY TABLE myTable" +
    "(id int NOT NULL AUTO_INCREMENT, firstName varchar(256), lastName varchar(256)," +
    "PRIMARY KEY (id))"
)
.then(()=>{
    return conn.query("INSERT INTO myTable(firstName, lastName) VALUES (?,?)", [
    "john",
    "smith"    
    ]);
})
.then(res=>{
    console.log(res);
    conn.end();
})
.catch(err=>{});

//Select

conn.query(
    "SELECT ID, COLLATION_NAME FROM INFORMATION_SCHEMA.COLLATIONS" + 
    "WHERE CHARACTER_SET_NAME = ? LIMIT 2", 
    ["utf8mb4"]
)
.then(res=>{
    console.log(res);
    conn.end();
})
.catch(err=>{});

