const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        port = process.env.PORT || 3000;

const mysql = require('mysql');

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8D472a5b6a69',
    database: 'jaleverDB'
});
 
// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./src/routes/approutes'); //importing route
routes(app); //register the route
