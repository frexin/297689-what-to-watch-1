import React from "react";
import PropTypes from 'prop-types';

import MoviesList from './movies-list.jsx';
import GenresList from "./genres-list.jsx";
import {ActionCreator} from "../reducer";
import {connect} from "react-redux";
import withActiveItem from "../hocs/with-active-item";
import {getMoviesForGenre, getGenresList} from "../reducer/selectors";

const WrappedGenres = withActiveItem(GenresList);
const WrappedMovies = withActiveItem(MoviesList);

const MainPage = (props) => {

  return (
      <div className={`page-content`}>
        <section className={`catalog`}>
          <WrappedGenres genres={props.genres} activeItem={props.currentGenre}
                         onSelect={props.onGenreSelect}/>
          <WrappedMovies movies={props.movies}/>
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
    preview_image: PropTypes.string.isRequired,
    preview_video_link: PropTypes.string.isRequired
  })).isRequired,
  onGenreSelect: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movies: getMoviesForGenre(state),
  genres: getGenresList(state),
  currentGenre: state.currentGenre
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

