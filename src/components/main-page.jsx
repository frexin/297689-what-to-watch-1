import React from "react";
import PropTypes from 'prop-types';

import MoviesList from './movies-list.jsx';
import GenresList from "./genres-list.jsx";
import SignIn from './sign-in.jsx';
import {ActionCreator, Operation} from "../reducer/data.js";
import {connect} from "react-redux";
import withActiveItem from "../hocs/with-active-item";
import {getMoviesForGenre, getGenresList} from "../reducer/selectors.js";

const WrappedGenres = withActiveItem(GenresList);
const WrappedMovies = withActiveItem(MoviesList);

const MainPage = (props) => {

  if (props.authRequire) {
    return (
        <SignIn onFormSubmit={props.onFormSubmit} />
    )
  }
  else {
    return (
        <div className={`page-content`}>
          <section className={`catalog`}>
            <WrappedGenres genres={props.genres} activeItem={props.currentGenre} onSelect={props.onGenreSelect}/>
            <WrappedMovies movies={props.movies}/>
          </section>
        </div>
    );
  }
};

MainPage.defaultProps = {
  movies: [],
};

MainPage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired
  })).isRequired,
  onGenreSelect: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movies: getMoviesForGenre(state),
  genres: getGenresList(state),
  currentGenre: state.currentGenre,
  authRequire: state.isAuthorizationRequired
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGenreSelect: (genre) => {
      dispatch(ActionCreator.changeGenre(genre));
    },
    onFormSubmit: (event) => {
      event.preventDefault();

      let email = null;
      let password = null;

      for (let elem of event.target.elements) {
        if (elem.name === `user-email`) {
          email = elem.value;
        }

        if (elem.name === `user-password`) {
          password = elem.value;
        }
      }

      dispatch(Operation.auth(email, password));
    }
  };
};

export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

