import React, {Fragment} from "react";
import PropTypes from 'prop-types';

import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from "../genres-list/genres-list.jsx";
import {ActionCreator} from "../../reducer/data.js";
import {connect} from "react-redux";
import withActiveItem from "../../hocs/with-active-item";
import {getMoviesForGenre, getGenresList} from "../../reducer/selectors.js";
import {Link} from "react-router-dom";

const WrappedGenres = withActiveItem(GenresList);
const WrappedMovies = withActiveItem(MoviesList);

const MainPage = (props) => {

  let userBlock = null;

  if (props.user) {
    userBlock = <div className="user-block__avatar">
      <img src={`https://es31-server.appspot.com/` + props.user.avatarUrl} alt="User avatar" width="63" height="63"/>
    </div>;
  } else {
    userBlock = <Link to="/login" className="user-block__link">Sign in</Link>;
  }

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

        <div className="user-block">{userBlock}</div>
      </header>
      <div className={`page-content`}>
        <section className={`catalog`}>
          <WrappedGenres genres={props.genres} activeItem={props.currentGenre} onSelect={props.onGenreSelect}/>
          <WrappedMovies movies={props.movies}/>
        </section>
      </div>
    </Fragment>
  );
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
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  onGenreSelect: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movies: getMoviesForGenre(state),
  genres: getGenresList(state),
  currentGenre: state.currentGenre,
  authRequire: state.isAuthorizationRequired,
  user: state.userData
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGenreSelect: (genre) => {
      dispatch(ActionCreator.changeGenre(genre));
    }
  };
};

export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

