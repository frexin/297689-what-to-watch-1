import React from "react";
import PropTypes from 'prop-types';
import Player from "../components/player/player.jsx";

const withBigPlayer = (Wrapped) => {
  class WithBigPlayer extends React.PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        showPlayer: false,
        isPlaying: false,
        secondsPlayed: 0
      };

      this.handleOpenPlayer = this.handleOpenPlayer.bind(this);
      this.handleClosePlayer = this.handleClosePlayer.bind(this);
      this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
      this.handleProgress = this.handleProgress.bind(this);
    }

    handleStatusUpdate(status) {
      this.setState({isPlaying: status});
    }

    handleOpenPlayer() {
      this.setState({showPlayer: true});
    }

    handleClosePlayer() {
      this.setState({showPlayer: false});
    }

    handleProgress(seconds) {
      this.setState({secondsPlayed: seconds});
    }

    render() {
      return (<Wrapped player={<Player secondsPlayed={this.state.secondsPlayed} onProgress={this.handleProgress} playing={this.state.isPlaying} onStatusUpdate={this.handleStatusUpdate} onClosePlayer={this.handleClosePlayer} movie={this.props.movie} />} onOpenPlayer={this.handleOpenPlayer} showPlayer={this.state.showPlayer} {...this.props} />);
    }
  }

  WithBigPlayer.propTypes = {
    movie: PropTypes.object
  };

  return WithBigPlayer;
};

export default withBigPlayer;
