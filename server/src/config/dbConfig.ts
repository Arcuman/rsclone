const constants = require('../constants/constants');
exports.config = {
  user: constants.DB_USER,
  database: constants.DB_NAME,
  password: constants.DB_PASSWORD,
  port: constants.DB_PORT,
};
