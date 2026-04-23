const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../err/customapi');

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
