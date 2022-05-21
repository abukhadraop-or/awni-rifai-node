const express = require('express');

const {
  createBook,
  serveBooks,
  getBooks,
  countBook,
  getBookById,
  deleteBook,
} = require('../controllers/book');

const router = express.Router();

/**
 * Handle GET to /books route.
 */

router.get('', getBooks);
/*
 * Handle get to /users route.
 */
router.get('/count', countBook);
router.get('/:id', getBookById);

/**
 * Handle POST to /books route.
 */
router.post('', createBook);
// router.route('').post(uploads.single('file'), createBook);

router.get('/files/books', serveBooks);
/**
 * Handle delete to /users route.
 */
router.delete('/:id', deleteBook);

module.exports = router;
