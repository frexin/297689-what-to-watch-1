import React from "react";
import PropTypes from 'prop-types';

class GenresList extends React.PureComponent {

  constructor(props) {
    super(props);

    this.genres = [`All genres`];

    props.movies.forEach((item) => {
      if (this.genres.indexOf(item.genre) === -1) {
        this.genres.push(item.genre);
      }
    });
  }


  render() {
    return (
      <ul className="catalog__genres-list">
        {
          this.genres.map((item) => {
            return (
              <li key={`genre-${item}`} className={`catalog__genres-item 
              ${this.props.currentGenre === item ? `catalog__genres-item--active` : ``}`}>
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
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired
};
