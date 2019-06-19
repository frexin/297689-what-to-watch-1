import React from 'react';
import renderer from 'react-test-renderer';

import {movies} from "../../mocks/films";
import MoviePlayer from "./movie-player";

it(`MoviePlayer component loads correctly`, () => {
  const mv = movies[0];
  const tree = renderer.create(<MoviePlayer poster={mv.previewImage} src={mv.previewVideoLink}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
