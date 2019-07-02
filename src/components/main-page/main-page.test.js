import React from 'react';
import renderer from 'react-test-renderer';
import {MainPage} from './main-page.jsx';
import {getGenresList} from '../../reducer/selectors';
import {BrowserRouter} from "react-router-dom";

import {movies} from "../../mocks/films";

const state = {
  currentGenre: `All genres`,
  moviesList: movies,
};

const genres = getGenresList(state);

it(`Main component shows default page`, () => {
  const tree = renderer.create(<BrowserRouter><MainPage hasMoreMovies={false} onLoadMore={jest.fn()} genres={genres} currentGenre={`All genres`} onGenreSelect={jest.fn()} movies={movies}/></BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
