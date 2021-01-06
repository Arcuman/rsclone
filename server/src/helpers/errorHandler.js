const HttpStatus = require('http-status-codes');

class ErrorHandler extends Error {
  constructor(statusCode, message = '') {
    super();
    this.statusCode = statusCode;
    this.message =
      message === '' ? HttpStatus.getStatusText(statusCode) : message;
  }
}

const returnError = (err, res) => {
  let { statusCode, message } = err;
  if (!statusCode) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    message = HttpStatus.getStatusText(statusCode);
  }
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

const catchError = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  ErrorHandler,
  returnError,
  catchError,
};
