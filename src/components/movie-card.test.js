import React from 'react';
import renderer from 'react-test-renderer';

import {movies} from "../mocks/films";
import MovieCard from "./movie-card";

it(`MovieCard component loads correctly`, () => {
  const mv = movies[0];
  const tree = renderer.create(<MovieCard preview={mv.previewVideoLink} id={mv.id} name={mv.name} picture={mv.previewImage} onMovieSelect={()=>{}}/>);

  expect(tree.toJSON()).toMatchSnapshot();
});
