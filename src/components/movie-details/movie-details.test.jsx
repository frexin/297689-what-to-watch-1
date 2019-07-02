import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import {movie} from "../../mocks/movie.js";

import {MovieDetails} from "./movie-details.jsx";

it(`MovieDetails component loads correctly`, () => {
  const tree = renderer.create(<BrowserRouter><MovieDetails match={{params: {id: `1`}}} similarMovies={[]} moviesList={[]} movie={movie} onComponentReady={jest.fn()} onMoviesLoaded={jest.fn()} /></BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
