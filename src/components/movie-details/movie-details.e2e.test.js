import React from 'react';
import Enzyme, {mount} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import {MovieDetails} from "./movie-details.jsx";
import {movies} from "../../mocks/films.js";
import {movie} from "../../mocks/movie.js";
import {comments} from "../../mocks/reviews";
import {MemoryRouter} from "react-router-dom";


Enzyme.configure({adapter: new Adapter()});

it(`MovieDetails component is able to change active tab`, () => {
  const componentUpdate = jest.fn();
  const movie = movies[0];

  const app = mount(<MemoryRouter><MovieDetails movie={movie} similarMovies={[]} onMoviesLoaded={componentUpdate} moviesList={movies} userBlock={<div>&nbsp;</div>} reviews={comments} match={{params: {id: `1`}}} /></MemoryRouter>);
  const tabs = app.find(`.movie-card__nav .movie-nav__link`);

  expect(tabs).toHaveLength(3);
  expect(componentUpdate).toHaveBeenLastCalledWith(1);


  app.setProps({match: {params: {id: `2`}}, newProp: true});
  expect(componentUpdate).toHaveBeenLastCalledWith(1);

  tabs.at(1).simulate(`click`);
  expect(app.find(`.movie-card__details-name`)).toHaveLength(5);
});


it(`Toggle favorite`, () => {
  const toggleFavorite = jest.fn();
  const componentUpdate = jest.fn();

  const app = mount(<MemoryRouter><MovieDetails toggleFavorite={toggleFavorite} movie={movie} similarMovies={[]} onMoviesLoaded={componentUpdate} moviesList={movies} userBlock={<div>&nbsp;</div>} reviews={comments} match={{params: {id: `1`}}} /></MemoryRouter>);
  const btn = app.find(`.btn--list`);

  btn.simulate(`click`);
  expect(toggleFavorite).toHaveBeenLastCalledWith(1, true);
});
