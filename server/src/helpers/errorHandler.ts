import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

class ErrorHandler extends Error {
  statusCode: number;

  message: string;

  constructor(statusCode: number, message = '') {
    super();
    this.statusCode = statusCode;
    this.message = message === '' ? getReasonPhrase(statusCode) : message;
  }
}

const returnError = (err: ErrorHandler, res: Response): void => {
  let { statusCode, message } = err;
  if (!statusCode) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  }
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const catchError = (fn: any): any => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
  return next();
};

export { ErrorHandler, returnError, catchError };
