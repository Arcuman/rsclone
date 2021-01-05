import {Client} from 'pg';
import config from './config/dbConfig';

const num1  = 12;
const client = new Client(config);
client.connect();
client.query('SELECT NOW()', (err : never, res : never) => {
  client.end();
});
