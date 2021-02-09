import * as http from 'http';
import { logger } from '@/helpers/logger';
import bidding from './resources/game/webSocketServer';
import { PORT } from './config/config';
import app from './app';

process
  .on('unhandledRejection', (reason: NodeJS.ErrnoException) => {
    const message = reason && reason.message ? reason.message : '';
    logger.error(`Unhandled Rejection at Promise: ${message}`);
    process.exitCode = 1;
  })
  .on('uncaughtException', (error: Error) => {
    logger.error(`Uncaught Exception: ${error.message}`);
    process.exitCode = 1;
  });

const server = http.createServer(app);
server.listen(PORT, () => {});

bidding(server);
