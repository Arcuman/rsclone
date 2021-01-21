import { ClientConfig } from 'pg';

import dotenv from 'dotenv';
import { envPath } from './config';

dotenv.config({
  path: envPath,
});

const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;

const config: ClientConfig = {
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
};

export default config;
