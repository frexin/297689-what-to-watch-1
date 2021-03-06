import {createSelector} from "reselect";

const getGenreFilter = (state) => state.currentGenre;
const getMovies = (state) => state.moviesList;
const getMovieGenre = (state) => state.currentMovie;

export const getMoviesForGenre = createSelector(
    [getGenreFilter, getMovies], (genreFilter, movies) => {
      return movies.filter((movie) => {
        if (genreFilter === `All genres`) {
          return true;
        }

        return movie.genre === genreFilter;
      });
    }
);

export const getSimilarMovies = createSelector(
    [getMovieGenre, getMovies], (movie, movies) => {
      const similarMovies = movies.filter((item) => movie && item.genre === movie.genre);

      return similarMovies.slice(0, 4);
    }
);

export const getGenresList = createSelector(
    [getMovies], (movies) => {
      const genres = [`All genres`];

      movies.forEach((item) => {
        if (!genres.includes(item.genre)) {
          genres.push(item.genre);
        }
      });

      return genres;
    }
);
