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
    console.log("Persons is connected");
    });

// GET all users from the DB
routes.get('/', (req, res, next) => {
    let sql = "SELECT * from PERSONS;";
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Persons were fetched',
            list: result
            
        });
   });
});

// GET one user with matching if drom DB
routes.get('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'SELECT * from PERSONS WHERE person_id =' + id;
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Person was searched',
            user: result
        });
   });
});

// POST one user with JSON and ADD to the DB
routes.post('/:firstName/:lastName/:linkedIn/:facebook/:instagram/:telegram/:snapchat/:picture/:info', (req, res, next) => {
    const user = {
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        linkedIn: req.params.linkedIn,
        facebook: req.params.facebook,
        instagram: req.params.instagram,
        telegram: req.params.telegram,
        snapchat: req.params.snapchat,
        picture: req.params.picture,
        info: req.params.info
        };
    let sql = 'INSERT INTO persons(firstname, lastname, linkedIn, facebook, instagram, telegram, snapchat, picture, info) VALUES("'+user.firstName+'","'+user.lastName+'","'+user.linkedIn+'","'+user.facebook+'","'+user.instagram+'","'+user.telegram+'","'+user.snapchat+'","'+user.picture+'","'+user.info+'");';
        con.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(201).json({
            message: 'Person was created',
            object: user    
        });
    });
});

// DELETE one user with matching id and clear in DB
routes.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'DELETE from persons WHERE person_id =' + id;
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(201).json({
            message: 'Person was deleted'
        });
    });
});

// PUT new info on user with JSON and change in the DB
routes.put('/:id/:firstName/:lastName/:linkedIn/:facebook/:instagram/:telegram/:snapchat/:picture/:info', (req, res, next) => {
   
    const user = {
        id: req.params.id,
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        linkedIn: req.params.linkedIn,
        facebook: req.params.facebook,
        instagram: req.params.instagram,
        telegram: req.params.telegram,
        snapchat: req.params.snapchat,
        picture: req.params.picture,
        info: req.params.info
        };
    let sql = 'UPDATE persons SET firstname = "'+user.firstName+'", lastname = "'+user.lastName+'", linkedIn = "'+user.linkedIn+'", facebook = "'+user.facebook+'", instagram = "'+user.instagram+'", telegram= "'+user.telegram+'", snapchat = "'+user.snapchat+'", picture = "'+user.picture+'", info = "'+user.info+'" WHERE person_id ='+user.id+';';
        con.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(201).json({
            message: 'Person was updated',
            object: user    
        });
    });
});


module.exports = routes;
