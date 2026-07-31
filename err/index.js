const CustomAPIError = require('../err/customapi')
const badRequest = require('../err/badrequesterr')
const notFound = require('../err/not-found')
const unAuntentication = require('../err/autherrorhandler')
const forbidden = require('../err/forbidden')

module.exports = {
  CustomAPIError,
  badRequest,
  notFound,
  unAuntentication,
  forbidden
}
