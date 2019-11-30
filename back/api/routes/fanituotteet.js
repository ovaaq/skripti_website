const express = require('express');
const routes = express.Router();
const db = require('C:\\simon\\webdevjatko\\skripti_website\\back\\db.js')
var verify= require("C:\\simon\\webdevjatko\\skripti_website\\back\\verify.js");
const jwt= require("jsonwebtoken");

// GET all fanituotteet from the DB
routes.get('/', (req, res, next) => {
    let sql = "SELECT * from FANITUOTTEET;";
    db.query(sql, (err, result) => {
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
    
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Fanituote was searched',
            user: result
        });
   });
});

// POST one fanituote with JSON and ADD to the DB
routes.post('/:fanituotekategoria_id/:hinta/:kuva/:info/:nimi',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    const fanituote = {
        fanituotekategoria_id: req.params.fanituotekategoria_id,
        hinta: req.params.hinta,
        kuva: req.params.kuva,
        info: req.params.info,
        nimi: req.params.nimi
        };
    let sql = 'INSERT INTO FANITUOTTEET (fanituotekategoria_id, hinta, kuva, info, nimi) VALUES('+fanituote.fanituotekategoria_id+','+fanituote.hinta+',"'+fanituote.kuva+'","'+fanituote.info+'","'+fanituote.nimi+'");';
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'FANITUOTTEET was added with one fanituote',
            object: fanituote
            
        });
   });        
}
});    

});

// DELETE one fanituote with matching id and clear in DB
routes.delete('/:id',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    var id = req.params.id;
    let sql = 'DELETE from FANITUOTTEET WHERE fanituote_id =' + id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'FANITUOTTEET was deleted with one fanituote'
            
        });
   });        
}
});    

});

// PUT new info on fanituote with JSON and change in the DB
routes.put('/:id/:fanituotekategoria_id/:hinta/:kuva/:info/:nimi',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    
    const fanituote = {
        id: req.params.id,
        fanituotekategoria_id: req.params.fanituotekategoria_id,
        hinta: req.params.hinta,
        kuva: req.params.kuva,
        info: req.params.info,
        nimi: req.params.nimi
        };
    let sql = 'UPDATE FANITUOTTEET SET fanituotekategoria_id = '+fanituote.fanituotekategoria_id+', hinta = '+fanituote.hinta+', kuva ="'+fanituote.kuva+'", info ="'+fanituote.info+'", nimi ="'+fanituote.nimi+'" WHERE fanituote_id ='+fanituote.id+';';
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'FANITUOTTEET was updated with one fanituote',
            object:fanituote
            
        });
   });        
}
});    

});


module.exports = routes;
