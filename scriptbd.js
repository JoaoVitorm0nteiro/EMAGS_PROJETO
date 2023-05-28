const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'teste',
    database:'projeto_pi'
});

module.exports = conn;