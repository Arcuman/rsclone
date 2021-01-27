import morgan from 'morgan';
import { Request } from 'express';
import { createLogger, format, transports, Logger } from 'winston';

const morganFormatString =
  ':method :status :url query=:query body=:body size :res[content-length] - :response-time ms';
const morganFormat = morgan.compile(morganFormatString);

morgan.token('query', (req: Request) => JSON.stringify(req.query));
morgan.token('body', (req: Request) => JSON.stringify(req.body));

const logger: Logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.cli()),
    }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.prettyPrint()),
    }),
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.prettyPrint()),
    }),
  ],
});
/* eslint class-methods-use-this: 0 */
class LoggerStream {
  write(message: string): void {
    const mes = message.toString();
    const mesChunk = mes.split(' ');
    const status = mesChunk[1];
    if (Number(status) >= 400) {
      logger.error(message);
    } else {
      logger.info(message);
    }
  }
}

export { morgan, morganFormat, logger, LoggerStream };
