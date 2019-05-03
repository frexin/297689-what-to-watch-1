import React from "react";
import PropTypes from 'prop-types';

const MainPage = (props) => {
  return (
    <div className={`page-content catalog__movies-list`}>
      {
        props.movies.map((name) => {
          return (
            <article key={name} className="small-movie-card catalog__movies-card">
              <button className="small-movie-card__play-btn" type="button">Play</button>
              <div className="small-movie-card__image">
                <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt={name} width="280" height="175"/>
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" onClick={props.onTitleClick} href="#">{name}</a>
              </h3>
            </article>
          );
        })
      }
    </div>
  );
};

MainPage.defaultProps = {
  movies: [],
  onTitleClick: () => {}
};

MainPage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string),
  onTitleClick: PropTypes.func
};

export default MainPage;

