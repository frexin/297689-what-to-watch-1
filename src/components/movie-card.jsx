import React from "react";
import PropTypes from 'prop-types';
import MoviePlayer from "./movie-player.jsx";

class MovieCard extends React.PureComponent {

  constructor(props) {
    super(props);

    this.timeoutId = null;

    this.previewHeight = 175;
    this.previewWidth = 280;

    this.state = {
      showPlayer: false
    };

    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() {
    this.timeoutId = setTimeout(() => {
      this.setState({showPlayer: true});
    }, 1000);

    let movie = Object.assign({}, this.props);
    delete movie.onMovieSelect;
    this.props.onMovieSelect(movie);
  }

  resetTimer() {
    clearTimeout(this.timeoutId);
    this.setState({showPlayer: false});
  }

  render() {
    let videoPreview = <img src={`img/${this.props.picture}`} alt={this.props.name} width={this.previewWidth} height={this.previewHeight} />;

    if (this.state.showPlayer) {
      videoPreview = <MoviePlayer poster={`img/${this.props.picture}`} src={this.props.preview} mute={true} width={this.previewWidth} height={this.previewHeight} />;
    }

    return (
      <article onMouseEnter={this.startTimer} onMouseLeave={this.resetTimer} className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image">
          {videoPreview}
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="#">{this.props.name}</a>
        </h3>
      </article>);
  }
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  onMovieSelect: PropTypes.func
};

export default MovieCard;
