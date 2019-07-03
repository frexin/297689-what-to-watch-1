import React from "react";
import {connect} from "react-redux";
import {formatPlayerDuration} from "../../utils.js";

import PropTypes from 'prop-types';

class Player extends React.Component {

  constructor(props) {
    super(props);

    this.videoTag = React.createRef();

    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.getTotalDuration = this.getTotalDuration.bind(this);
    this.enterFullScreen = this.enterFullScreen.bind(this);
    this.getProgress = this.getProgress.bind(this);
  }

  getNode() {
    return this.videoTag.current;
  }

  componentDidMount() {
    const node = this.getNode();

    node.ontimeupdate = () => {
      this.props.onProgress(this.getNode().currentTime);
    };
  }

  getTotalDuration() {
    if (this.props.secondsPlayed) {
      const delta = this.getNode().duration - this.props.secondsPlayed;
      return new Date(delta * 1000).toISOString().substr(11, 8);
    } else {
      return formatPlayerDuration(this.props.movie.runTime);
    }
  }

  getProgress() {
    if (this.props.secondsPlayed) {
      return (this.props.secondsPlayed / this.getNode().duration) * 100;
    } else {
      return 0;
    }
  }

  playVideo() {
    this.props.onStatusUpdate(true);
    this.getNode().play();
  }

  pauseVideo() {
    this.props.onStatusUpdate(false);
    this.getNode().pause();
  }

  enterFullScreen() {
    this.getNode().requestFullscreen();
  }

  render() {
    const movie = this.props.movie;

    if (movie) {
      return (
        <div className="player">
          <video src={movie.videoLink} ref={this.videoTag} className="player__video" poster={movie.backgroundImage}>
            <source src={movie.videoLink} type="video/mp4" />
          </video>

          <button type="button" className="player__exit" onClick={this.props.onClosePlayer}>Exit</button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value={this.getProgress()} max="100" />
                <div className="player__toggler" style={{left: `${this.getProgress()}%`}}>Toggler</div>
              </div>
              <div className="player__time-value">{this.getTotalDuration()}</div>
            </div>

            <div className="player__controls-row">
              <button type="button" className={`player__play ${!this.props.playing ? `` : `visually-hidden`}`} onClick={this.playVideo}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </button>

              <button type="button" className={`player__play ${this.props.playing ? `` : `visually-hidden`}`} onClick={this.pauseVideo}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#pause"/>
                </svg>
                <span>Pause</span>
              </button>

              <div className="player__name">{movie.name}</div>

              <button type="button" className="player__full-screen" onClick={this.enterFullScreen}>
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"/>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

Player.propTypes = {
  movie: PropTypes.object,
  secondsPlayed: PropTypes.number,
  playing: PropTypes.bool,
  onProgress: PropTypes.func,
  onClosePlayer: PropTypes.func,
  onStatusUpdate: PropTypes.func
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movie: state.currentMovie,
});

export {Player};
export default connect(mapStateToProps)(Player);
