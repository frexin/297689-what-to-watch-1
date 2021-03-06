import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {getRatingDescription} from "../../utils";

const MovieTabOverview = (props) => {

  const movie = props.movie;

  return (
    <Fragment>
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
    </Fragment>
  );
};

MovieTabOverview.propTypes = {
  movie: PropTypes.object
};

export default MovieTabOverview;
