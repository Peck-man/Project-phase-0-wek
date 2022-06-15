'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(onConnectHandler);

function onConnectHandler(error) {
    if (error) {
        console.error(`MySQL connection error: ${error}`);
        return;
    }
    console.log(`Connected to MySQL (id=${connection.threadId})`)
}

module.exports = connection;