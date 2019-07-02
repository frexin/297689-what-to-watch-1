import React from 'react';
import renderer from 'react-test-renderer';

import {movies} from "../../mocks/films";
import MoviesList from "./movies-list";
import {BrowserRouter} from "react-router-dom";

it(`MoviesList component loads correctly`, () => {
  const tree = renderer.create(<BrowserRouter><MoviesList hasMoreMovies={false} onLoadMore={jest.fn()} movies={movies} /></BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
