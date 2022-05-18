const express = require('express');
const {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  countAuthor,
} = require('../controllers/author');
const { validateUser } = require('../middlewares/validators/userValidator');

const router = express.Router();

/**
 * Handle get to /authors route.
 */
router.get('', getAuthors);
/**
 * Handle get to /authors route.
 */
router.get('/count', countAuthor);
router.get('/:id', getAuthorById);
/**
 * Handle post to /authors route.
 */
router.route('').post(validateUser, createAuthor);
/**
 * Handle put to /authors route.
 */
router.route('/:id').put(validateUser, updateAuthor);
/**
 * Handle delete to /authors route.
 */
router.delete('/:id', deleteAuthor);

module.exports = router;
