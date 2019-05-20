import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {movies} from "../mocks/films";
import MovieCard from "./movie-card";

Enzyme.configure({adapter: new Adapter()});

it(`MovieCard component renders correctly and able to deal with item click`, () => {
  const fakeHover = jest.fn();
  const movie = movies[0];

  const app = shallow(<MovieCard id={movie.id} preview={movie.preview} name={movie.name} picture={movie.picture} onMovieSelect={fakeHover}/>);
  app.simulate(`mouseenter`);

  expect(fakeHover).toHaveBeenCalledWith(movie);
});
