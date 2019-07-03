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

      this.openPlayer = this.openPlayer.bind(this);
      this.closePlayer = this.closePlayer.bind(this);
      this.updateStatus = this.updateStatus.bind(this);
      this.progress = this.progress.bind(this);
    }

    updateStatus(status) {
      this.setState({isPlaying: status});
    }

    openPlayer() {
      this.setState({showPlayer: true});
    }

    closePlayer() {
      this.setState({showPlayer: false});
    }

    progress(seconds) {
      this.setState({secondsPlayed: seconds});
    }

    render() {
      return (<Wrapped player={<Player secondsPlayed={this.state.secondsPlayed} onProgress={this.progress} playing={this.state.isPlaying} onStatusUpdate={this.updateStatus} onClosePlayer={this.closePlayer} movie={this.props.movie} />} onOpenPlayer={this.openPlayer} showPlayer={this.state.showPlayer} {...this.props} />);
    }
  }

  WithBigPlayer.propTypes = {
    movie: PropTypes.object
  };

  return WithBigPlayer;
};

export default withBigPlayer;
