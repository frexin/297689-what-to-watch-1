import React from 'react';
import renderer from 'react-test-renderer';
import {MainPage} from './main-page.jsx';
import {getGenresList} from '../../reducer/selectors';
import {MemoryRouter} from "react-router-dom";

import {movies} from "../../mocks/films";

const state = {
  currentGenre: `All genres`,
  moviesList: movies,
};

const genres = getGenresList(state);

it(`Main component shows default page`, () => {
  const tree = renderer.create(<MemoryRouter><MainPage hasMoreMovies={false} onLoadMore={jest.fn()} genres={genres} currentGenre={`All genres`} onGenreSelect={jest.fn()} movies={movies}/></MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
