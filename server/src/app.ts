import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import { HTTP_HEADERS, ORIGINS_HOST } from '@/constants/constants';
import { decksRouter } from '@/resources/decks/decks.router';
import { cardRouter } from '@/resources/card/card.router';
import { levelRouter } from '@/resources/level/level.router';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { returnError, ErrorHandler } from '@/helpers/errorHandler';
import { morgan, morganFormat, LoggerStream } from '@/helpers/logger';
import { authRouter, authenticate } from './resources/auth/auth.router';
import { router } from './resources/users/user.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(passport.initialize());
app.use(
  morgan(morganFormat, {
    stream: new LoggerStream(),
  }),
);

app.use((req, res, next) => {
  HTTP_HEADERS.forEach(resHeader => {
    res.setHeader(resHeader[0], resHeader[1]);
  });
  next();
});

app.use(cors({ credentials: true, origin: ORIGINS_HOST }));
app.options('*', cors());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', authenticate, router);
app.use('/decks', authenticate, decksRouter);
app.use('/cards', authenticate, cardRouter);
app.use('/level', authenticate, levelRouter);
app.use('/login', authRouter);
app.use('/logout', authRouter);
app.use('/register', authRouter);
app.use('/refresh-tokens', authRouter);
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  returnError(err, res);
  next();
});
export default app;
