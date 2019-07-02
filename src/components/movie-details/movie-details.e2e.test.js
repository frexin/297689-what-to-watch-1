import React from 'react';
import Enzyme, {mount} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import {MovieDetails} from "./movie-details.jsx";
import {movies} from "../../mocks/films";
import {comments} from "../../mocks/reviews";


Enzyme.configure({adapter: new Adapter()});

it(`MovieDetails component is able to change active tab`, () => {
  const componentUpdate = jest.fn();
  const movie = movies[0];

  const app = mount(<MovieDetails movie={movie} similarMovies={[]} onMoviesLoaded={componentUpdate} moviesList={movies} userBlock={<div>&nbsp;</div>} reviews={comments} match={{params: {id: `1`}}} />);
  const tabs = app.find(`.movie-card__nav .movie-nav__link`);

  expect(tabs).toHaveLength(3);
  expect(componentUpdate).toHaveBeenCalledTimes(1);

  app.setProps({match: {params: {id: `2`}}});
  expect(componentUpdate).toHaveBeenLastCalledWith(2);

  tabs.at(1).simulate(`click`);
  expect(app.find(`.movie-card__details-name`)).toHaveLength(5);
});
