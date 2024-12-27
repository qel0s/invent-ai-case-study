var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const books = await knex('books').select('book_id', 'title', 'author', 'published_year', 'genre', 'rating', 'rating_count');
    res.json(books);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);

  try {

    const bookDetails = await knex('books as b')
      .select(
        'b.title',
        'b.author',
        'b.published_year',
        'b.genre',
        'b.book_id'
      )
      .where('b.book_id', bookId)
      .first();

    if (!bookDetails) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const currentOwner = await knex('borrowed_books as bb')
      .select('u.first_name', 'u.last_name', 'u.email', 'bb.borrow_date', 'u.user_id')
      .join('users as u', 'bb.user_id', 'u.user_id')
      .where('bb.book_id', bookId)
      .whereNull('bb.return_date')
      .first();

    const averageRating = await knex('book_ratings as br')
      .select(knex.raw('AVG(br.rating) as average_rating'))
      .where('br.book_id', bookId)
      .first();

    const bookData = {
      ...bookDetails,
      currentOwner,
      averageRating: averageRating ? averageRating.average_rating : 0,
    };

    res.json(bookData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching book details' });
  }
});;

module.exports = router;
