const express = require('express');
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  storeFetchedMovie,
  deleteMovie,
} = require('../controllers/movie');

const router = express.Router();

/**
 * Handle POST to /movies route.
 */
router.post('', createMovie);

/**
 * Handle GET tp /movies route.
 */
router.get('', getMovies);

/**
 * Handle GET to /movies/store.
 */
router.get('/store', storeFetchedMovie);

/**
 * Handle GET to /movies route.
 */
router.get('/:id', getMovieById);

/**
 * Handle PUT to /movies route.
 */
router.put('/:id', updateMovie);

/**
 * Handle DELETE to /movies route
 */
router.delete('/:id', deleteMovie);

module.exports = router;
