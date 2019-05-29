import React from "react";
import PropTypes from 'prop-types';
import MovieCard from './movie-card.jsx';

class MoviesList extends React.PureComponent {

  render() {

    return (
      <div className={`page-content catalog__movies-list`}>
        {
          this.props.movies.map((item) => {
            return (
              <MovieCard key={`item-${item.id}`} id={item.id} name={item.name} picture={item.preview_image} preview={item.preview_video_link} onMovieSelect={this.props.onSelect}/>
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
    preview_video_link: PropTypes.string.isRequired,
    preview_image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func,
};
