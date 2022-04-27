const { Movie } = require('../models');

/**
 * Get all movies.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();

    if (!movies) {
      return res.status(404).send({ error: 'Movie not found' });
    }

    return res.status(200).send(movies);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

/**
 * Get movie by Id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByPk(id, {});

    if (!movie) {
      res.status(404).send({ error: 'Movie not found' });
    }

    res.status(200).send(movie);
  } catch (err) {
    res.status(500).send(err);
  }
};

/**
 * Create new Movie.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createMovie = async (req, res) => {
  try {
    const movie = req.body;
    const MOVIE_MODEL = {
      title: movie.title,
      posterPath: movie.posterPath,
      voteAverage: movie.voteAverage,
      overview: movie.overview,
    };

    const movieCreated = await Movie.create(MOVIE_MODEL);

    res.status(201).send(movieCreated);
  } catch (err) {
    res.status(500).send(err);
  }
};

/**
 * Update movie.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateMovie = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const [status, movieUpdated] = await Movie.update(data, {
      returning: true,
      where: { id },
    });

    if (status === 0) {
      res.status(404).send({ error: 'not found' });
    }

    res.status(200).send(movieUpdated);
  } catch (err) {
    res.status(500).send(err);
  }
};

/**
 * Store movies fetched from api.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const storeFetchedMovie = async (req, res) => {
  try {
    await Movie.storeFetchedMovies(req.params.page);
    res.status(201).send('stored');
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

/**
 * Delete movie by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteMovie = async (req, res) => {
  const { id } = req.params;

  await Movie.destroy({ where: { id } });

  res.sendStatus(204);
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  storeFetchedMovie,
  deleteMovie,
};
