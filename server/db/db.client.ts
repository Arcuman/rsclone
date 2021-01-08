import {Client} from 'pg';
import  config  from '../src/config/dbConfig';

const connectToDB = (cb:any):void => {
  const client = new Client(config);
  
  client.connect().catch((error:string)=>error);
  cb();
};

export default connectToDB;
