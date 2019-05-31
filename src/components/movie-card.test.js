import React from 'react';
import renderer from 'react-test-renderer';

import {movies} from "../mocks/films";
import MovieCard from "./movie-card";

it(`MovieCard component loads correctly`, () => {
  const mv = movies[0];
  const tree = renderer.create(<MovieCard preview={mv.preview_video_link} id={mv.id} name={mv.name} picture={mv.preview_image} onMovieSelect={()=>{}}/>);

  expect(tree.toJSON()).toMatchSnapshot();
});
