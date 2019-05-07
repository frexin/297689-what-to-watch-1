import React from 'react';
import renderer from 'react-test-renderer';

import {movies} from "../mocks/films";
import MoviesList from "./movies-list";

it(`MoviesList component loads correctly`, () => {
  const tree = renderer.create(<MoviesList movies={movies} />).toJSON();

  expect(tree).toMatchSnapshot();
});
