import React, {Fragment} from "react";
import PropTypes from "prop-types";

class MovieCardBig extends React.Component {

  render() {
    const movie = this.props.movie;

    if (!movie) {
      return <Fragment/>;
    }

    return (
      <Fragment>
        <section className="movie-card">
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
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={movie.posterImage} alt={movie.name} width="218" height="327"/>
              </div>

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
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

MovieCardBig.propTypes = {
  isFavorite: PropTypes.number,
  userBlock: PropTypes.object,
  showPlayer: PropTypes.bool,
  onOpenPlayer: PropTypes.func,
  similarMovies: PropTypes.array,
  onMoviesLoaded: PropTypes.func,
  toggleFavorite: PropTypes.func,
  movie: PropTypes.object
};

export default MovieCardBig;
