// import { authRouter, authenticate } from './controllers/auth/auth.router';

// const passportObj = require('passport');
import express from 'express';
import cors from 'cors';
import  {router} from './controllers/users/user.router';

const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
// const { returnError } = require('./helpers/errorHandler');

// app.get('/', (req, res) => res.send('Express + TypeS
const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(cors());
// app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// app.use(passportObj.initialize());

app.use('/', (req:any, res:any, next:any) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// app.use('/users', authenticate, userRouter);
app.use('/users', router);
// app.use('/login', authRouter);
// app.use('*', authenticate);
export default app;
