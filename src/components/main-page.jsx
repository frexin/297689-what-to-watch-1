import React from "react";
import PropTypes from 'prop-types';

const MainPage = (props) => {
  return <div><h1>Hello, {props.name}</h1></div>;
};

MainPage.defaultProps = {
  name: `Anon`
};

MainPage.propTypes = {
  name: PropTypes.string
};

export default MainPage;

