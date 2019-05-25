import React from "react";
import PropTypes from 'prop-types';

class GenresList extends React.PureComponent {

  render() {
    return (
      <ul className="catalog__genres-list">
        {
          this.props.genres.map((item) => {
            return (
              <li key={`genre-${item}`} className={`catalog__genres-item 
              ${this.props.activeItem === item ? `catalog__genres-item--active` : ``}`}>
                <a href="#" onClick={() => this.props.onSelect(item)} className="catalog__genres-link">{item}</a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default GenresList;

GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired
};
