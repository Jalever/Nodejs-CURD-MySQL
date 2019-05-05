'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',

    user     : 'root',
    password : '8D472a5b6a69',
    database : 'jaleverDB'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
