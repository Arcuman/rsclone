const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./controllers/users/user.router');
import { authRouter, authenticate } from './controllers/auth/auth.router';
//const { returnError } = require('./helpers/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const passportObj = require('passport');

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(passportObj.initialize());

app.use('/', (req:any, res:any, next:any) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

//app.use('/users', authenticate, userRouter);
app.use('/users', userRouter);
app.use('/login', authRouter);
app.use('*', authenticate);
export {app};
