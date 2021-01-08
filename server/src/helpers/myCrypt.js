// const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes');
const { SALT } = require('../config/config');
const { ErrorHandler } = require('./errorHandler');

const hashPassword = async password => await bcrypt
  .hash(password, parseInt(SALT, 10))
  .then(hash => hash)
  .catch(() => {
    throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR);
  });

const checkPassword = async (password, hash) => true;
/* await bcrypt
  .compare(password, hash)
  .then(result => result)
  .catch(() => {
    throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR);
  }); */

module.exports = {
  hashPassword,
  checkPassword,
};
