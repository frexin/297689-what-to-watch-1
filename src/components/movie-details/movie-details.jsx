import React, {Fragment} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {getRatingDescription} from "../../utils.js";
import {ActionCreator, Operation} from "../../reducer/data.js";

class MovieDetails extends React.Component {

  componentDidUpdate() {
    const movieId = parseInt(this.props.match.params.id, 10);

    if (!this.props.movie && this.props.moviesList.length) {
      this.props.onMoviesLoaded(movieId);
    }

    return true;
  }

  componentDidMount() {
    this.props.onComponentReady();
  }

  render() {

    const movie = this.props.movie;

    if (!movie) {
      return <Fragment/>;
    }

    return (
      <Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.backgroundImage} alt={movie.name}/>
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="/" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <div className="user-block">{this.props.userBlock}</div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.released}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                    </svg>
                    <span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>
          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={movie.posterImage} alt={movie.name} width="218" height="327"/>
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <li className="movie-nav__item movie-nav__item--active">
                      <a href="#" className="movie-nav__link">Overview</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Details</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Reviews</a>
                    </li>
                  </ul>
                </nav>

                <div className="movie-rating">
                  <div className="movie-rating__score">{movie.rating}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level">{getRatingDescription(movie.rating)}</span>
                    <span className="movie-rating__count">{movie.scoresCount} ratings</span>
                  </p>
                </div>

                <div className="movie-card__text">
                  <p>{movie.description}</p>

                  <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>
                  <p className="movie-card__starring"><strong>Starring: {movie.starring.join(`, `)}
                    and other</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movie: state.movie,
  moviesList: state.moviesList
});

const mapDispatchToProps = (dispatch) => {
  return {
    onMoviesLoaded: (movieId) => {
      dispatch(ActionCreator.selectMovie(movieId));
    },
    onComponentReady: () => {
      dispatch(Operation.loadMovies());
    }
  };
};

MovieDetails.propTypes = {
  userBlock: PropTypes.object,
  moviesList: PropTypes.array,
  onMoviesLoaded: PropTypes.func,
  onComponentReady: PropTypes.func,
  movie: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export {MovieDetails};
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
