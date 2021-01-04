const { Client } = require('pg');
const { config } = require('./config/dbConfig');

type Type1 = string | number;
const number : Type1 = 1;

const client = new Client(config);
client.connect();
client.query('SELECT NOW()', ( err: any , res : any ) => {
  // eslint-disable-next-line no-console
  console.log(err, res);
  client.end();
});

