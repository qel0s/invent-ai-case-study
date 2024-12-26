const knexConfig = require('../knexFile');
const knex = require('knex')(knexConfig.development);

module.exports = knex;
