import React, {Fragment} from "react";
import PropTypes from 'prop-types';

import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from "../genres-list/genres-list.jsx";
import {ActionCreator} from "../../reducer/data.js";
import {connect} from "react-redux";
import withActiveItem from "../../hocs/with-active-item";
import {getMoviesForGenre, getGenresList} from "../../reducer/selectors.js";

const WrappedGenres = withActiveItem(GenresList);
const WrappedMovies = withActiveItem(MoviesList);

const MainPage = (props) => {

  return (
    <Fragment>
      <header className="page-header">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">{props.userBlock}</div>
      </header>
      <div className={`page-content`}>
        <section className={`catalog`}>
          <WrappedGenres genres={props.genres} activeItem={props.currentGenre} onSelect={props.onGenreSelect} />
          <WrappedMovies movies={props.movies} onLoadMore={props.onLoadMore} hasMoreMovies={props.hasMoreMovies} />
        </section>
      </div>
    </Fragment>
  );
};

MainPage.defaultProps = {
  movies: [],
};

MainPage.propTypes = {
  userBlock: PropTypes.object,
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired
  })).isRequired,
  onGenreSelect: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func,
  hasMoreMovies: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movies: getMoviesForGenre(state),
  genres: getGenresList(state),
  currentGenre: state.currentGenre,
  authRequire: state.isAuthorizationRequired,
  hasMoreMovies: state.hasMoreMovies
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGenreSelect: (genre) => {
      dispatch(ActionCreator.changeGenre(genre));
    },
    onLoadMore: () => {
      dispatch(ActionCreator.extendLimit());
    }
  };
};

export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

