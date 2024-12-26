var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/', async function (req, res, next) {
  try {
    const users = await knex('users').select('*');
    res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await knex('users')
      .select('user_id', 'first_name', 'last_name', 'email', 'registration_date')
      .where('user_id', userId)
      .first();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const borrowed_books = await knex('borrowed_books as bb')
      .join('books as b', 'bb.book_id', 'b.book_id')
      .leftJoin('book_ratings as br', function () {
        this.on('bb.user_id', '=', 'br.user_id').andOn('b.book_id', '=', 'br.book_id');
      })
      .select(
        'b.book_id',
        'b.title as book_title',
        'b.author as book_author',
        'b.published_year as book_published_year',
        'br.rating as book_rating',
        'bb.borrow_date as borrow_date',
        'bb.return_date as return_date'
      )
      .where('bb.user_id', userId);

    res.json({
      user,
      borrowed_books: borrowed_books || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
