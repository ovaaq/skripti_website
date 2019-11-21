const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql'); 
const app = express();
    



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    next();
    });

const routesPersons = require('./api/routes/persons');
const routesTapahtumat = require('./api/routes/tapahtumat');
const routesJasenrekisteri = require('./api/routes/jasenrekisteri');
const routesFanituotteet = require('./api/routes/fanituotteet');
const routesTuutorit = require('./api/routes/tuutorit');
const routesAdmin= require('./api/routes/admin');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/persons', routesPersons);
app.use('/tapahtumat', routesTapahtumat);
app.use('/jasenrekisteri', routesJasenrekisteri);
app.use('/fanituotteet', routesFanituotteet);
app.use('/tuutorit', routesTuutorit);
app.use('/admin', routesAdmin);


/*
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

*/

module.exports = app;
