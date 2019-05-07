import React from "react";
import PropTypes from 'prop-types';

import MoviesList from './movies-list.jsx';

const MainPage = (props) => {
  return (
    <div>
      <MoviesList movies={props.movies}/>
    </div>
  );
};

MainPage.defaultProps = {
  movies: [],
};

MainPage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  })).isRequired
};

export default MainPage;

