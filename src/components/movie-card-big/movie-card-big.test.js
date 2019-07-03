import React from 'react';
import renderer from 'react-test-renderer';
import {movie} from "../../mocks/movie.js";

import MovieCardBig from "./movie-card-big.jsx";

it(`MovieBigCard component loads correctly`, () => {
  const tree = renderer.create(<MovieCardBig movie={movie} isFavorite={1} onOpenPlayer={jest.fn()} toggleFavorite={jest.fn()} />).toJSON();

  expect(tree).toMatchSnapshot();
});
