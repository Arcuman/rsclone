// import { authRouter, authenticate } from './controllers/auth/auth.router';

// const passportObj = require('passport');
import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import passport from 'passport';
import  {router} from './controllers/users/user.router';
import { authRouter, authenticate } from './controllers/auth/auth.router';

// const { returnError } = require('./helpers/errorHandler');

const app = express();

app.use(express.json());
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(cors());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(passport.initialize());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', authenticate, router);
// app.use('/users', router);
app.use('/login', authRouter);
app.use('*', authenticate);
export default app;
