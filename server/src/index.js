"use strict";
const { Client } = require('pg');
const { config } = require('./config/dbConfig');
const number = 1;
const client = new Client(config);
client.connect();
client.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    client.end();
});
