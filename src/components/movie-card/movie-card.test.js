import React from 'react';
import renderer from 'react-test-renderer';

import {movies} from "../../mocks/films";
import MovieCard from "./movie-card";
import {BrowserRouter} from "react-router-dom";

it(`MovieCard component loads correctly`, () => {
  const mv = movies[0];
  const tree = renderer.create(<BrowserRouter><MovieCard preview={mv.previewVideoLink} id={mv.id} name={mv.name} picture={mv.previewImage} onMovieSelect={()=>{}}/></BrowserRouter>);

  expect(tree.toJSON()).toMatchSnapshot();
});
