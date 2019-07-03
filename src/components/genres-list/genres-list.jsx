import React from "react";
import PropTypes from 'prop-types';

const GenresList = (props) => {

  return (
    <ul className="catalog__genres-list">
      {
        props.genres.map((item) => {
          return (
            <li key={`genre-${item}`} className={`catalog__genres-item ${props.activeItem === item ? `catalog__genres-item--active` : ``}`}>
              <a href="#" onClick={() => props.onSelect(item)} className="catalog__genres-link">{item}</a>
            </li>
          );
        })
      }
    </ul>
  );
};

export default GenresList;

GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired
};
