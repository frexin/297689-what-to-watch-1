import React from 'react';
import renderer from 'react-test-renderer';
import {movie} from "../../mocks/movie.js";

import MovieTabDetails from "./movie-tab-details.jsx";

it(`MovieTabDetails component loads correctly`, () => {
  const tree = renderer.create(<MovieTabDetails movie={movie} />).toJSON();

  expect(tree).toMatchSnapshot();
});
