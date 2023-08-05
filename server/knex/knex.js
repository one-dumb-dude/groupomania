const environment = process.env.KNEX_ENVIRONMENT || 'development';
const config = require('../knexfile')[environment];
module.exports = require('knex')(config);
