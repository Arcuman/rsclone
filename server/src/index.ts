const { Client } = require('pg');
const { config } = require('./config/dbConfig');

const client = new Client(config);
client.connect();
client.query('SELECT NOW()', ( err: any , res : any ) => {
  // eslint-disable-next-line no-console
  console.log(err, res);
  client.end();
});

