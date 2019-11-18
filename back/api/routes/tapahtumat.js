const express = require('express');
const router = express.Router();

const mysql = require('mysql'); 

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Makkaraperunat1",
    database: "db"
    });

con.connect(function(err) {
    if (err) throw err;
    console.log("Tapahtumat is connected");
    });



// GET all tapahtumat from the DB
router.get('/', (req, res, next) => {
    let sql = "SELECT * from TAPAHTUMAT;";
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Tapahtumat were fetched',
            list: result
        });
   });
});

// GET one tapahtuma with matching if drom DB
router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'SELECT * from tapahtumat WHERE tapahtuma_id =' + id;
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Tapahtuma was searched',
            user: result
        });
   });
});

// POST one tapahtuma with JSON and ADD to the DB
router.post('/:startTime/:endTime/:missa/:mika/:linkki/:kuva/:teksti/:hinta', (req, res, next) => {
    const tapahtuma = {
        startTime: req.params.startTime,
        endTime: req.params.endTime,
        missa: req.params.missa,
        mika: req.params.mika,
        linkki: req.params.linkki,
        kuva: req.params.kuva,
        teksti: req.params.teksti,
        hinta: req.params.hinta
        };
    let sql = 'INSERT INTO tapahtumat(start_time, end_time, missa, mika, linkki ,kuva, teksti ,hinta) VALUES("'+tapahtuma.startTime+'","'+tapahtuma.endTime+'","'+tapahtuma.missa+'","'+tapahtuma.mika+'","'+tapahtuma.linkki+'","'+tapahtuma.kuva+'","'+tapahtuma.teksti+'","'+tapahtuma.hinta+'");';
        con.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(201).json({
            message: 'Tapahtuma was created',
            object: tapahtuma   
        });
    });
});

// DELETE one tapahtumat with matching id and clear in DB
router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'DELETE from tapahtumat WHERE tapahtuma_id =' + id;
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(201).json({
            message: 'Tapahtuma was deleted'
        });
    });
});

// PUT new info on tapahtuma with JSON and change in the DB
router.put('/:id/:startTime/:endTime/:missa/:mika/:linkki/:kuva/:teksti/:hinta', (req, res, next) => {
    
    const tapahtuma = {
        id: req.params.id,
        startTime: req.params.startTime,
        endTime: req.params.endTime,
        missa: req.params.missa,
        mika: req.params.mika,
        linkki: req.params.linkki,
        kuva: req.params.kuva,
        teksti: req.params.teksti,
        hinta: req.params.hinta
        };
    let sql = 'UPDATE tapahtumat SET start_time = "'+tapahtuma.startTime+'", end_time = "'+tapahtuma.endTime+'", missa ="'+tapahtuma.missa+'", mika= "'+tapahtuma.mika+'", linkki = "'+tapahtuma.linkki+'", kuva = "'+tapahtuma.kuva+'", teksti = "'+tapahtuma.teksti+'", hinta = "'+tapahtuma.hinta+'" WHERE tapahtuma_id ='+tapahtuma.id+';';
        con.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(201).json({
            message: 'User was updated',
            object: tapahtuma    
        });
    });
});


module.exports = router;
