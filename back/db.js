const mysql = require('mysql'); 

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Makkaraperunat1",
    database: "db",
    timezone: +0200
    });

con.connect(function(err) {
    if (err) throw err;
    console.log("Kaikki is connected");
    });


    module.exports = con;