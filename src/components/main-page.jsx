import React from "react";
import PropTypes from 'prop-types';

import MoviesList from './movies-list.jsx';
import GenresList from "./genres-list.jsx";
import {ActionCreator} from "../reducer";
import {connect} from "react-redux";
import {movies} from "../mocks/films.js";
import withActiveItem from "../hocs/with-active-item";

const WrappedGenres = withActiveItem(GenresList);
const WrappedMovies = withActiveItem(MoviesList);

const prepareGenres = (moviesList) => {
  const genres = [`All genres`];

  moviesList.forEach((item) => {
    if (genres.indexOf(item.genre) === -1) {
      genres.push(item.genre);
    }
  });

  return genres;
};

const MainPage = (props) => {

  return (
    <div className={`page-content`}>
      <section className={`catalog`}>
        <WrappedGenres genres={prepareGenres(movies)} activeItem={props.currentGenre} onSelect={props.onGenreSelect} />
        <WrappedMovies movies={props.movies} />
      </section>
    </div>
  );
};

MainPage.defaultProps = {
  movies: [],
};

MainPage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  })).isRequired,
  onGenreSelect: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movies: state.moviesList,
  currentGenre: state.currentGenre
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGenreSelect: (genre) => {
      dispatch(ActionCreator.changeGenre(genre));
      dispatch(ActionCreator.getMoviesByGenre(genre));
    }
  };
};

export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

