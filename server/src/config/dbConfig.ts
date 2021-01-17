
import * as dotenv from 'dotenv';
import  * as path from 'path';
import {ClientConfig} from 'pg';

const envPath = path.join(__dirname, '../.env');

dotenv.config({
  path: envPath,
});

const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST} =  process.env;

const config:ClientConfig = {
  port: Number(DB_PORT),
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
};

export default config;
