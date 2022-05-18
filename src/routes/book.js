const express = require('express');
const { createBook, serveBooks } = require('../controllers/book');

const router = express.Router();

/**
 * Handle POST to /books route.
 */
router.post('', createBook);
router.get('/files/books', serveBooks);

module.exports = router;
