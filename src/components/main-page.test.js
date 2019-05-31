import React from 'react';
import renderer from 'react-test-renderer';
import {MainPage} from './main-page.jsx';
import {getGenresList} from './../reducer/selectors';

import {movies} from "../mocks/films";

it(`Main components loads correctly`, () => {
  const state = {
    currentGenre: `All genres`,
    moviesList: movies
  };

  const genres = getGenresList(state);
  const tree = renderer.create(<MainPage genres={genres} currentGenre={`All genres`} onGenreSelect={jest.fn()} movies={movies} />).toJSON();

  expect(tree).toMatchSnapshot();
});
