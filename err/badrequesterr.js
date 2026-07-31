const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../err/customapi');

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
