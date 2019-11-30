const express = require('express');
const routes = express.Router();
const db = require('C:\\simon\\webdevjatko\\skripti_website\\back\\db.js')
var verify= require("C:\\simon\\webdevjatko\\skripti_website\\back\\verify.js");


// GET all tuutorit from the DB
routes.get('/', (req, res, next) => {
    let sql = "SELECT tuutorit.tuutorit_id,tuutorit.start_time,persons.firstname,persons.lastname, persons.info FROM TUUTORIT INNER JOIN PERSONS ON TUUTORIT.person_id = PERSONS.person_id;";
    
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Tuutorit were fetched',
            list: result
        });
   });
});

// antaa nykyiset tuutorit
routes.get('/current', (req, res, next) => {
    let sql = "SELECT tuutorit.tuutorit_id,tuutorit.start_time,persons.firstname,persons.lastname, persons.linkedIn, persons.facebook, persons.instagram, persons.telegram, persons.snapchat, persons.picture, persons.info FROM TUUTORIT INNER JOIN PERSONS ON TUUTORIT.person_id = PERSONS.person_id WHERE start_time = YEAR(CURRENT_TIMESTAMP);";
    
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Tuutorit were fetched current',
            list: result
        });
   });
});

// GET one tuutori with matching if drom DB
routes.get('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'SELECT tuutorit.tuutorit_id,tuutorit.start_time,persons.firstname,persons.lastname, persons.info FROM TUUTORIT INNER JOIN PERSONS ON TUUTORIT.person_id = PERSONS.person_id WHERE tuutorit_id =' + id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Tuutori was searched',
            user: result
        });
   });
});

// POST one tuutori with JSON and ADD to the DB
routes.post('/:person_id/:start_time',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    const tuutori = {
        person_id: req.params.person_id,
        start_time: req.params.start_time
        
    
        };
    let sql = 'INSERT INTO TUUTORIT (person_id, start_time) VALUES('+tuutori.person_id+',"'+tuutori.start_time+'");';
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'TUUTORI was added',
            object:tuutori,
            authData
        });
   });        
}
});    

});

// DELETE one tuutori with matching id and clear in DB
routes.delete('/:id',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    var id = req.params.id;
    let sql = 'DELETE from TUUTORIT WHERE tuutorit_id =' + id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'TUUTORI was deleted',
            authData
        });
   });        
}
});    

});
// PUT new info on tuutori with JSON and change in the DB
routes.put('/:id/:person_id/:start_time', (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    
    const tuutori = {
        id: req.params.id,
        person_id: req.params.person_id,
        start_time: req.params.start_time
        };
    let sql = 'UPDATE TUUTORIT SET person_id = '+tuutori.person_id+', start_time = "'+tuutori.start_time+'" WHERE tuutorit_id ='+tuutori.id+';';
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'TUUTORI was updated',
            object:tuutori,
            authData
        });
   });        
}
});    

});


module.exports = routes;
