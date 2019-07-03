import React, {Fragment} from "react";
import PropTypes from 'prop-types';

import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from "../genres-list/genres-list.jsx";
import {ActionCreator} from "../../reducer/data.js";
import {connect} from "react-redux";
import withActiveItem from "../../hocs/with-active-item.js";
import {getMoviesForGenre, getGenresList} from "../../reducer/selectors.js";
import MovieCardBig from "../movie-card-big/movie-card-big.jsx";
import withLayout from "../../hocs/with-layout.js";
import {Operation} from "../../reducer/data";


const WrappedGenres = withActiveItem(GenresList);
const WrappedMovies = withActiveItem(MoviesList);

const MainPage = (props) => {
  const BigCard = withLayout(MovieCardBig);

  if (props.showPlayer) {
    return <div>{props.player}</div>;
  }

  return (
    <Fragment>
      <BigCard movie={props.promo} {...props} />
      <div className={`page-content`}>
        <section className={`catalog`}>
          <WrappedGenres genres={props.genres} activeItem={props.currentGenre} onSelect={props.onGenreSelect} />
          <WrappedMovies movies={props.movies} onLoadMore={props.onLoadMore} hasMoreMovies={props.hasMoreMovies} />
        </section>
        {props.footer}
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
  promo: state.promoMovie,
  currentMovie: state.promoMovie,
  isFavorite: state.promoMovie ? +state.promoMovie.isFavorite : 0,
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
    },
    toggleFavorite: (id, status) => {
      dispatch(Operation.toggleFavorite(id, +status));
    }
  };
};

export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

