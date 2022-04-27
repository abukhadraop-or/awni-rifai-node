const { Model } = require('sequelize');
const fetch = require('node-fetch');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Fetch movies from the movie api.
     *
     * @param {number} page.
     *
     * @return {Promise<array>}
     */
    static async fetchMovie(page = 1) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=a6ce94f05ccb22f0236d41a4d037e960&page=${page}`
      );

      const data = await response.json();

      return data.results;
    }

    /**
     * Store movies fetched form the api into the database.
     *
     * @param {number} page
     */
    static async storeFetchedMovies(page = 1) {
      const movies = await this.fetchMovie(page);
      movies.forEach(async (movie) => {
        const MOVIE_MODEL = {
          title: movie.title,
          posterPath: movie.poster_path,
          voteAverage: Number(movie.vote_average),
          overview: movie.overview,
        };
        await Movie.create(MOVIE_MODEL);
      });
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      voteAverage: DataTypes.FLOAT,
      posterPath: DataTypes.STRING,
      overview: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Movie',
    }
  );
  return Movie;
};
