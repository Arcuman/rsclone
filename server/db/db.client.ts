import  config  from '../src/config/dbConfig';

const { Client } = require('pg');

const connectToDB = (cb:any):void => {
  // console.log('config=',config);
  const client = new Client(config);
  client.connect().catch((err:string) =>  err);

  //  client.query('SELECT NOW()', ( err: any , res : any ) => {
  // eslint-disable-next-line no-console
  // console.log(err, res);
  // client.end();
  cb();
  // });
};

export default connectToDB;
