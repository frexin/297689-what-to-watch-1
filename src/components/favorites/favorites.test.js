import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from "react-router-dom";
import {movies} from "../../mocks/films.js";

import {Favorites} from "./favorites.jsx";

it(`Favorites component loads correctly`, () => {
  const tree = renderer.create(<MemoryRouter><Favorites favMoviesList={movies} onComponentReady={jest.fn()} /></MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
