import React from "react";
import PropTypes from 'prop-types';
import MovieCard from './movie-card.jsx';

class MoviesList extends React.PureComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeMovie: {}
    };

    this.onMovieSelect = this.onMovieSelect.bind(this);
  }

  onMovieSelect(selectedMovie) {
    this.setState({activeMovie: selectedMovie});
  }

  render() {

    return (
      <div className={`page-content catalog__movies-list`}>
        {
          this.props.movies.map((item) => {
            return (
              <MovieCard key={`item-${item.id}`} id={item.id} name={item.name} picture={item.picture}
                         preview={item.preview} onMovieSelect={this.onMovieSelect}/>
            );
          })
        }
      </div>
    );
  }
}

export default MoviesList;

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  })).isRequired
};
