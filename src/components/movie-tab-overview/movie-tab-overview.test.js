import React from 'react';
import renderer from 'react-test-renderer';
import {movie} from "../../mocks/movie.js";

import MovieTabOverview from "./movie-tab-overview.jsx";

it(`MovieTabOverview component loads correctly`, () => {
  const tree = renderer.create(<MovieTabOverview movie={movie} />).toJSON();

  expect(tree).toMatchSnapshot();
});
