
import * as dotenv from 'dotenv';
import  * as path from 'path';
import {ClientConfig} from 'pg';

const envPath = path.join(__dirname, '../.env');

dotenv.config({
  path: envPath,
});

const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT} =  process.env;

const config:ClientConfig = {
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
};
/*
export interface DbConfig {
  user: string | undefined;
  database: string| undefined;
  password: string| undefined;
  port: number| undefined;
} */

export default config;