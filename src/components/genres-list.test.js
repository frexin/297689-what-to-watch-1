import React from 'react';
import renderer from 'react-test-renderer';

import {movies} from "../mocks/films";
import GenresList from "./genres-list";

it(`GenresList component loads correctly`, () => {
  const tree = renderer.create(<GenresList movies={movies} onSelect={() => {}} currentGenre={`All genres`} />).toJSON();

  expect(tree).toMatchSnapshot();
});
