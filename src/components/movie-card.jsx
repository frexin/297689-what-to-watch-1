import React from "react";
import PropTypes from 'prop-types';

const MovieCard = (props) => {
  return (
    <article key={name} className="small-movie-card catalog__movies-card" onMouseOver={() => {
      props.onMovieHover(props);
    }}>
      <button className="small-movie-card__play-btn" type="button">Play</button>
      <div className="small-movie-card__image">
        <img src={`img/${props.picture}`} alt={props.name} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="#">{props.name}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  onMovieHover: PropTypes.func.isRequired
};

export default MovieCard;
