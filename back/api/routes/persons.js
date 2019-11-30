const express = require('express');
const routes = express.Router();
const db = require('C:\\simon\\webdevjatko\\skripti_website\\back\\db.js')
var verify= require("C:\\simon\\webdevjatko\\skripti_website\\back\\verify.js");
// GET all person from the DB
routes.get('/', (req, res, next) => {
    let sql = "SELECT * from PERSONS;";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Persons were fetched',
            list: result
            
        });
   });
});


// GET hallituslaiset with current year
routes.get('/current', (req, res, next) => {
    let sql = "SELECT hallitus_id FROM HALLITUKSET WHERE start_time = YEAR(CURRENT_TIMESTAMP);";
    
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        let sql2 ="SELECT persons.person_id, persons.firstname,persons.linkedIn, persons.facebook, persons.instagram,persons.telegram,persons.snapchat, persons.picture,persons.info FROM PERSONS INNER JOIN IHMISETHALLITUKSISSA ON persons.person_id = ihmisethallituksissa.person_id WHERE hallitus_id ="+JSON.stringify(result[0].hallitus_id)+";"
        db.query(sql2, (err, result2) => {
            if(err) throw err;
            console.log(result2);
            
            res.status(200).json({
                message: 'Current hallituslaiset were fetched current',
                list: result2
            });
        });
   });
});




 //GET one person with matching if drom DB
routes.get('/:id', (req, res, next) => {
    var id = req.params.id;
    let sql = 'SELECT  * from PERSONS WHERE person_id =' + id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'Person was searched',
            user: result
        });
   });
});




// POST one person with JSON and ADD to the DB
routes.post('/:firstName/:lastName/:linkedIn/:facebook/:instagram/:telegram/:snapchat/:picture/:info',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
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
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'PERSON WAS ADDED',
            object:user,
            authData
        });
   });        
}
});    

});

// DELETE one person with matching id and clear in DB
routes.delete('/:id',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    var id = req.params.id;
    let sql = 'DELETE from persons WHERE person_id =' + id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'PERSON was deleted',
            authData
        });
   });        
}
});    

});
// PUT new info on person with JSON and change in the DB
routes.put('/:id/:firstName/:lastName/:linkedIn/:facebook/:instagram/:telegram/:snapchat/:picture/:info',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    
   
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
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'PERSON was updated',
            object:user,
            authData
        });
   });        
}
});    

});


module.exports = routes;
