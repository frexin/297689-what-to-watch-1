import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';
import ShowMoreBtn from "../show-more-btn/show-more-btn.jsx";

class MoviesList extends React.PureComponent {

  render() {

    return (
      <Fragment>
        <div className={`page-content catalog__movies-list`}>
          {
            this.props.movies.map((item) => {
              return (
                <MovieCard key={`item-${item.id}`} id={item.id} name={item.name} picture={item.previewImage} preview={item.previewVideoLink} onMovieSelect={this.props.onSelect}/>
              );
            })
          }
        </div>
        <ShowMoreBtn showBtn={this.props.hasMoreMovies} onLoadMore={this.props.onLoadMore} />
      </Fragment>
    );
  }
}

export default MoviesList;

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func,
  onLoadMore: PropTypes.func,
  hasMoreMovies: PropTypes.bool
};
