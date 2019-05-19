import React from "react";
import PropTypes from 'prop-types';

const MoviePlayer = (props) => {

    return (
        <div>
          <video width={props.width} height={props.height} autoPlay={true} muted={props.mute}
                 poster={props.poster} src={props.src} />
        </div>
    );
};

export default MoviePlayer;

MoviePlayer.propTypes = {
  mute: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
