const express = require('express');
const router = express.Router();
const db = require('C:\\simon\\webdevjatko\\skripti_website\\back\\db.js')
var verify= require("C:\\simon\\webdevjatko\\skripti_website\\back\\verify.js");
const jwt= require("jsonwebtoken");




// GET all tapahtumat from the DB
router.get('/', (req, res, next) => {
    let sql = "SELECT * from TAPAHTUMAT;";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Tapahtumat were fetched',
            list: result
        });
   });
});


// one tapahtuma with matching if drom DB
router.get('/future', (req, res, next) => {
    var id = req.params.id;
    let sql = 'SELECT * from tapahtumat WHERE start_time > CURRENT_TIMESTAMP ORDER BY start_time;';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Tapahtuma was searched for future',
            list: result
        });
   });
});



// GET one tapahtuma with matching if drom DB
router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'SELECT * from tapahtumat WHERE tapahtuma_id =' + id;
    db.query(sql, (err, result) => {
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
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
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
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'TAPAHTUMA was added',
            object:tapahtuma
            
        });
   });        
}
});    

});

// DELETE one tapahtumat with matching id and clear in DB
router.delete('/:id', (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    var id = req.params.id;
    let sql = 'DELETE from tapahtumat WHERE tapahtuma_id =' + id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'TAPAHTUMA was deleted'       
            
        });
   });        
}
});    

});

// PUT new info on tapahtuma with JSON and change in the DB
router.put('/:id/:startTime/:endTime/:missa/:mika/:linkki/:kuva/:teksti/:hinta', (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    
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
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'TAPAHTUMA was updated', 
            object:tapahtuma        
            
        });
   });        
}
});    

});


module.exports = router;
