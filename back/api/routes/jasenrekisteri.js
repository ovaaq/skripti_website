const express = require('express');
const routes = express.Router();
const db = require('C:\\simon\\webdevjatko\\skripti_website\\back\\db.js')
const jwt= require("jsonwebtoken");
var verify= require("C:\\simon\\webdevjatko\\skripti_website\\back\\verify.js");


// GET all jasenet from the DB
routes.get('/',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            let sql = "SELECT * from JASENREKISTERI;";
            db.query(sql, (err, result) => {
                if(err) throw err;
                console.log(result);
                res.status(200).json({
                    message: 'JASENREKISTERI was fetched',
                    list: result
                   
                });
           });        
        }
      });    

});


//maksaneet on false
routes.get('/false',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    let sql = "SELECT * from JASENREKISTERI WHERE maksu = 0;";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'JASENREKISTERI was fetched with maksaneet = false',
            list: result
            
        });
   });        
}
});    

});


//maksaneet on true ja liittymispäivää ei ole
routes.get('/hyvaksymattomat',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    let sql = "SELECT * from JASENREKISTERI WHERE maksu = 1 AND hyvaksytty IS NULL;";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'JASENREKISTERI was fetched with maksaneet true and hyväksytty is null',
            list: result
            
        });
   });        
}
});    

});


//kaikki, joissa liittymispäivä !=null ja eroaminen =null
routes.get('/nykyiset',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    let sql = "SELECT * from JASENREKISTERI WHERE hyvaksytty IS NOT NULL AND  eronnut IS NULL;";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'JASENREKISTERI was fetched with hyväksytty ei ole null ja eronnut ei ole null',
            list: result
            
        });
   });        
}
});    

});




// GET one jasen with matching if drom DB
routes.get('/:id',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    var id = req.body.id;
    let sql = 'SELECT * from JASENREKISTERI WHERE jasen_id =' + id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'JASENREKISTERI with id',
            list: result
            
        });
   });        
}
});    

});

// POST one jasen with JSON and ADD to the DB
routes.post('/', (req, res, next) => {
    const jasen = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        kotipaikka: req.body.kotipaikka,
        email: req.body.email,
        jasentyyppi: req.body.jasentyyppi,
        maksu: '0',
        aloitusvuosi: req.body.aloitusvuosi,
        tiedotus: req.body.tiedotus
        };
    let sql = 'INSERT INTO JASENREKISTERI(etunimi, sukunimi, kotipaikka, email, jasentyyppi_id, maksu, aloitusvuosi, tiedotus) VALUES("'+jasen.firstName+'","'+jasen.lastName+'","'+jasen.kotipaikka+'","'+jasen.email+'",'+jasen.jasentyyppi+','+jasen.maksu+','+jasen.aloitusvuosi+','+jasen.tiedotus+')';
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'JASENREKISTERI was updated with one jasen',
            object: jasen
            
        });
   });        
}
    

);

// DELETE one jasen with matching id and clear in DB
routes.delete('/:id',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    var id = req.body.id;
    let sql = 'DELETE from JASENREKISTERI WHERE jasen_id =' + id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message: 'JASENREKISTERI was deleted with one jasen',
            
        });
   });        
}
});    

});

// PUT new info on jasen with JSON and change in the DB
routes.put('/:id/:firstName/:lastName/:kotipaikka/:email/:jasentyyppi/:maksu/:aloitusvuosi/:hyvaksytty/:eronnut/:tiedotus',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    
    const jasen = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        kotipaikka: req.body.kotipaikka,
        email: req.body.email,
        jasentyyppi: req.body.jasentyyppi,
        maksu: req.body.maksu,
        aloitusvuosi: req.body.aloitusvuosi,
        hyvaksytty: req.body.hyvaksytty,
        eronnut: req.body.eronnut,
        tiedotus: req.body.tiedotus
        };
    let sql = 'UPDATE JASENREKISTERI SET etunimi = "'+jasen.firstName+'", sukunimi = "'+jasen.lastName+'", kotipaikka = "'+jasen.kotipaikka+'", email= "'+jasen.email+'", jasentyyppi_id = '+jasen.jasentyyppi+', maksu = '+jasen.maksu+', aloitusvuosi = '+jasen.aloitusvuosi+', hyvaksytty = "'+jasen.hyvaksytty+'", eronnut = "'+jasen.eronnut+'", tiedotus ='+jasen.tiedotus+' WHERE jasen_id = '+jasen.id+';';
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'JASENREKISTERI was updated',
            object: jasen,
            
        });
   });        
}
});    

});

routes.put('/erota/',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    
    const jasen = {
        id: req.body.jasen_id,

        };
        
    let sql = 'UPDATE JASENREKISTERI SET eronnut = CURRENT_TIMESTAMP WHERE jasen_id = '+jasen.id+';';
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'JASENREKISTERI was updated',
            object: jasen,
            
        });
   });        
}
});    

});


routes.put('/hyvaksy',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    
    const jasen = {
        id: req.body.jasen_id,

        };
    let sql = 'UPDATE JASENREKISTERI SET hyvaksytty = CURRENT_TIMESTAMP WHERE jasen_id = '+jasen.id+';';
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'JASENREKISTERI was updated',
            object: jasen,
            
        });
   });        
}
});    

});

routes.put('/',verify.verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
    
    const jasen = {
        id: req.body.jasen_id,
        maksu: req.body.maksu,
        
        
        };
    let sql = 'UPDATE JASENREKISTERI SET maksu = '+ jasen.maksu +' WHERE jasen_id = '+ jasen.id+';';
        db.query(sql, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.status(200).json({
            message: 'JASENREKISTERI was updated',
            object: jasen,
            
        });
   });        
}
});    

});










module.exports = routes;
