import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

class ErrorHandler extends Error {
  statusCode:number;

  message:string;

  constructor(statusCode:number, message = '') {
    super();
    this.statusCode = statusCode;
    this.message =
      message === '' ? getReasonPhrase(statusCode) : message;
  }
}

const returnError = (err:ErrorHandler, res:Response) => {
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
 
/* eslint consistent-return: 1 */
const catchError =  (fn:any) => 
  async (req:Request, res:Response, next:NextFunction)=> {
    try {
      await fn(req, res, next);
    } catch (error) {
      return next(error);
    }  
  };

export  {
  ErrorHandler,
  returnError,
  catchError,
};
