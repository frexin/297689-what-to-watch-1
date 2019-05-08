import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

import {movies} from "../mocks/films";

it(`Main components loads correctly`, () => {
  const tree = renderer.create(<MainPage movies={movies} />).toJSON();

  expect(tree).toMatchSnapshot();
});
