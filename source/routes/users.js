var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/', async function (req, res, next) {
  try {
    const users = await knex('users').select('user_id', 'first_name', 'last_name', 'email', 'registration_date');
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

router.post('/:user_id/return/:book_id', async (req, res) => {

  const user_id = req.params.user_id;
  const book_id = req.params.book_id;
  const rating = req.body.rating;

  if (!rating) {
    return res.status(400).json({ message: 'Score is required' });
  }

  try {
    await knex('borrowed_books')
      .where({ user_id, book_id })
      .update({ return_date: knex.fn.now() });

    await knex('book_ratings').insert({
      user_id,
      book_id,
      rating,
    });

    res.json({ message: 'Book returned successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error returning book' });
  }

});

module.exports = router;
