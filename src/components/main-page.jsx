import React from "react";
import PropTypes from 'prop-types';

const MainPage = (props) => {
  return (
    <div className={`page-content catalog__movies-list`}>
      {
        props.movies.map((name, index) => {
          return (
            <article key={`index-${index}`} className="small-movie-card catalog__movies-card">
              <button className="small-movie-card__play-btn" type="button">Play</button>
              <div className="small-movie-card__image">
                <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt={name} width="280" height="175"/>
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" href="movie-page.html">{name}</a>
              </h3>
            </article>
          );
        })
      }
    </div>
  );
};

MainPage.defaultProps = {
  movies: []
};

MainPage.propTypes = {
  movies: PropTypes.array
};

export default MainPage;

