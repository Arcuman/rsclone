const { Client } = require('pg');
import { config } from '../src/config/dbConfig';

export const connectToDB = (cb:any):void => {
  //console.log('config=',config);
  const client = new Client(config);
  client.connect();
  //  client.query('SELECT NOW()', ( err: any , res : any ) => {
  // eslint-disable-next-line no-console
  // console.log(err, res);
  // client.end();
  cb();
  //});
};

