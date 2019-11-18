const express = require('express');
const routes = express.Router();

const mysql = require('mysql'); 

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Makkaraperunat1",
    database: "db"
    });

con.connect(function(err) {
    if (err) throw err;
    console.log("Jasenrekisteri is connected");
    });



// GET all jasenet from the DB
routes.get('/', (req, res, next) => {
    let sql = "SELECT * from JASENREKISTERI;";
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'JASENREKISTERI was fetched',
            list: result
        });
   });
});

// GET one jasen with matching if drom DB
routes.get('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'SELECT * from JASENREKISTERI WHERE jasen_id =' + id;
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Jasen was searched',
            user: result
        });
   });
});

// POST one jasen with JSON and ADD to the DB
routes.post('/:firstName/:lastName/:kotipaikka/:email/:jasentyyppi/:maksu/:aloitusvuosi/:hyvaksytty/:eronnut/:tiedotus', (req, res, next) => {
    const jasen = {
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        kotipaikka: req.params.kotipaikka,
        email: req.params.email,
        jasentyyppi: req.params.jasentyyppi,
        maksu: req.params.maksu,
        aloitusvuosi: req.params.aloitusvuosi,
        hyvaksytty: req.params.hyvaksytty,
        eronnut: req.params.eronnut,
        tiedotus: req.params.tiedotus
        };
    let sql = 'INSERT INTO JASENREKISTERI(etunimi, sukunimi, kotipaikka, email, jasentyyppi_id, maksu, aloitusvuosi, hyvaksytty, eronnut, tiedotus) VALUES("'+jasen.firstName+'","'+jasen.lastName+'","'+jasen.kotipaikka+'","'+jasen.email+'",'+jasen.jasentyyppi+','+jasen.maksu+','+jasen.aloitusvuosi+',"'+jasen.hyvaksytty+'","'+jasen.eronnut+'",'+jasen.tiedotus+');';
        con.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(201).json({
            message: 'Jasen was created',
            object: jasen    
        });
    });
});

// DELETE one jasen with matching id and clear in DB
routes.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'DELETE from JASENREKISTERI WHERE jasen_id =' + id;
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(201).json({
            message: 'Jasen was deleted'
        });
    });
});

// PUT new info on jasen with JSON and change in the DB
routes.put('/:id/:firstName/:lastName/:kotipaikka/:email/:jasentyyppi/:maksu/:aloitusvuosi/:hyvaksytty/:eronnut/:tiedotus', (req, res, next) => {
    
    const jasen = {
        id: req.params.id,
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        kotipaikka: req.params.kotipaikka,
        email: req.params.email,
        jasentyyppi: req.params.jasentyyppi,
        maksu: req.params.maksu,
        aloitusvuosi: req.params.aloitusvuosi,
        hyvaksytty: req.params.hyvaksytty,
        eronnut: req.params.eronnut,
        tiedotus: req.params.tiedotus
        };
    let sql = 'UPDATE JASENREKISTERI SET etunimi = "'+jasen.firstName+'", sukunimi = "'+jasen.lastName+'", kotipaikka = "'+jasen.kotipaikka+'", email= "'+jasen.email+'", jasentyyppi_id = '+jasen.jasentyyppi+', maksu = '+jasen.maksu+', aloitusvuosi = '+jasen.aloitusvuosi+', hyvaksytty = "'+jasen.hyvaksytty+'", eronnut = "'+jasen.eronnut+'", tiedotus ='+jasen.tiedotus+' WHERE jasen_id = '+jasen.id+';';
        con.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(201).json({
            message: 'User was updated',
            object: jasen    
        });
    });
});


module.exports = routes;
