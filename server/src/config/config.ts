import dotenv from 'dotenv';
import  path from 'path';

const envPath = path.join(__dirname, '../.env');

dotenv.config({
  path: envPath,
});

const { SALT, JWT_SECRET_KEY } = process.env;
const PORT = 3000;

export  {
  SALT,
  JWT_SECRET_KEY,
  PORT,
};
