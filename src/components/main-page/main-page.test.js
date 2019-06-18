import React from 'react';
import renderer from 'react-test-renderer';
import {MainPage} from './main-page.jsx';
import {getGenresList} from '../../reducer/selectors';

import {movies} from "../../mocks/films";

const state = {
  currentGenre: `All genres`,
  moviesList: movies,
};

const genres = getGenresList(state);

it(`Main component shows default page`, () => {

  const user = {
    id: 1,
    email: `Oliver.conner@gmail.com`,
    name: `Oliver.conner`
  };

  const tree = renderer.create(<MainPage genres={genres} currentGenre={`All genres`} onGenreSelect={jest.fn()} user={user} movies={movies}/>).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Main component shows signin page`, () => {
  const tree = renderer.create(<MainPage genres={genres} currentGenre={`All genres`} onGenreSelect={jest.fn()} user={null} movies={movies}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
