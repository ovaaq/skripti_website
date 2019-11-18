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
    console.log("Fanituotteet is connected");
    });



// GET all fanituotteet from the DB
routes.get('/', (req, res, next) => {
    let sql = "SELECT * from FANITUOTTEET;";
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Fanituotteet were fetched',
            list: result
        });
   });
});

// GET one fanituote with matching if drom DB
routes.get('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'SELECT * from FANITUOTTEET WHERE fanituote_id =' + id;
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Fanituote was searched',
            user: result
        });
   });
});

// POST one fanituote with JSON and ADD to the DB
routes.post('/:fanituotekategoria_id/:hinta/:kuva/:info/:nimi', (req, res, next) => {
    const fanituote = {
        fanituotekategoria_id: req.params.fanituotekategoria_id,
        hinta: req.params.hinta,
        kuva: req.params.kuva,
        info: req.params.info,
        nimi: req.params.nimi
        };
    let sql = 'INSERT INTO FANITUOTTEET (fanituotekategoria_id, hinta, kuva, info, nimi) VALUES('+fanituote.fanituotekategoria_id+','+fanituote.hinta+',"'+fanituote.kuva+'","'+fanituote.info+'","'+fanituote.nimi+'");';
        con.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(201).json({
            message: 'Fanituote was created',
            object: fanituote    
        });
    });
});

// DELETE one fanituote with matching id and clear in DB
routes.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'DELETE from FANITUOTTEET WHERE fanituote_id =' + id;
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(201).json({
            message: 'Fanituote was deleted'
        });
    });
});

// PUT new info on fanituote with JSON and change in the DB
routes.put('/:id/:fanituotekategoria_id/:hinta/:kuva/:info/:nimi', (req, res, next) => {
    
    const fanituote = {
        id: req.params.id,
        fanituotekategoria_id: req.params.fanituotekategoria_id,
        hinta: req.params.hinta,
        kuva: req.params.kuva,
        info: req.params.info,
        nimi: req.params.nimi
        };
    let sql = 'UPDATE FANITUOTTEET SET fanituotekategoria_id = '+fanituote.fanituotekategoria_id+', hinta = '+fanituote.hinta+', kuva ="'+fanituote.kuva+'", info ="'+fanituote.info+'", nimi ="'+fanituote.nimi+'" WHERE fanituote_id ='+fanituote.id+';';
        con.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(201).json({
            message: 'Fanituote was updated',
            object: fanituote    
        });
    });
});


module.exports = routes;
