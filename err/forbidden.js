const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../err/customapi');

class Forbidden extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = Forbidden;
