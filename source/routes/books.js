var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const books = await knex('books').select('*');
    res.json(books);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
