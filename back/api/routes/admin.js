const express = require('express');
const jwt = require('jsonwebtoken');
const routes = express.Router();
const db = require('C:\\simon\\webdevjatko\\skripti_website\\back\\db.js');
const bcrypt = require('bcrypt');




routes.post("/login", (req, res2, next) => {
    const user = {
        tunnus: req.body.tunnus,
        salasana: req.body.salasana
      
        };
    let sql = 'SELECT salasana  FROM ADMINS WHERE tunnus = "' + user.tunnus +'";';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);

        bcrypt.compare(user.salasana,result[0].salasana, function(err, res) {
            if(err) throw err;
            if(res==true){

                jwt.sign({user}, 'secretkey', { expiresIn: '300000s' }, (err, token) => {
                    if(err) throw err;
                    res2.status(200).json({

                        message: 'login was success',
                        token: token
                    });
                });
            }

      });
    
  });
});




module.exports = routes;

