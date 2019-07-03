import React, {Fragment} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {Operation} from "../../reducer/data.js";
import Tabs from "./../tabs/tabs.jsx";
import MovieTabOverview from "../movie-tab-overview/movie-tab-overview.jsx";
import MovieTabDetails from "../movie-tab-details/movie-tab-details.jsx";
import MovieTabReviews from "../movie-tab-reviews/movie-tab-reviews.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import withActiveItem from "../../hocs/with-active-item";
import {Link} from "react-router-dom";

import {getSimilarMovies} from "../../reducer/selectors.js";
const WrappedMovies = withActiveItem(MoviesList);

class MovieDetails extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const movieId = parseInt(this.props.match.params.id, 10);
      this.props.onMoviesLoaded(movieId);
    }

    return true;
  }

  componentDidMount() {
    const movieId = parseInt(this.props.match.params.id, 10);

    this.props.onMoviesLoaded(movieId);
  }

  render() {
    const movie = this.props.movie;

    if (!movie) {
      return <Fragment/>;
    }

    if (this.props.showPlayer) {
      return <div>{this.props.player}</div>;
    }

    return (
      <Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.backgroundImage} alt={movie.name}/>
            </div>
            <h1 className="visually-hidden">WTW</h1>
            {this.props.userBlock}

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.released}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button" onClick={this.props.onOpenPlayer}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s" />
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" onClick={() => this.props.toggleFavorite(movie.id, !movie.isFavorite)} type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={`#${this.props.isFavorite ? `in-list` : `add`}`} />
                    </svg>
                    <span>My list</span>
                  </button>
                  <Link to={`/films/${movie.id}/review`} className="btn movie-card__button">Add review</Link>
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
                <Tabs components={[MovieTabOverview, MovieTabDetails, MovieTabReviews]} {...this.props} />
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <WrappedMovies onLoadMore={() => {}} hasMoreMovies={false} movies={this.props.similarMovies} />
          </section>

        {this.props.footer}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movie: state.currentMovie,
  moviesList: state.moviesList,
  isFavorite: state.currentMovie ? +state.currentMovie.isFavorite : 0,
  reviews: state.reviews,
  similarMovies: getSimilarMovies(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    onMoviesLoaded: (movieId) => {
      dispatch(Operation.loadMovie(movieId));
    },
    toggleFavorite: (id, status) => {
      dispatch(Operation.toggleFavorite(id, +status));
    }
  };
};

MovieDetails.propTypes = {
  isFavorite: PropTypes.number,
  userBlock: PropTypes.object,
  player: PropTypes.object,
  showPlayer: PropTypes.bool,
  onOpenPlayer: PropTypes.func,
  moviesList: PropTypes.array,
  similarMovies: PropTypes.array,
  onMoviesLoaded: PropTypes.func,
  toggleFavorite: PropTypes.func,
  movie: PropTypes.object,
  reviews: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export {MovieDetails};
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
