import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {movies} from "../mocks/films";
import MovieCard from "./movie-card";

Enzyme.configure({adapter: new Adapter()});

it(`Main component renders correctly and able to deal with item click`, () => {
  const fakeClick = jest.fn();
  const movie = movies[0];
  movie.onMovieSelect = fakeClick;

  const app = shallow(<MovieCard id={movie.id} name={movie.name} picture={movie.picture} onMovieSelect={fakeClick}/>);
  const play = app.find(`button.small-movie-card__play-btn`);
  play.simulate(`click`);

  expect(fakeClick).toHaveBeenCalledWith(movie);
});
