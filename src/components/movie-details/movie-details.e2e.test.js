import React from 'react';
import Enzyme, {mount} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import {MovieDetails} from "./movie-details.jsx";
import {movies} from "../../mocks/films";
import {BrowserRouter} from "react-router-dom";


Enzyme.configure({adapter: new Adapter()});

it(`MovieDetails component is able to change active tab`, () => {
  const fakeCallback = jest.fn();

  const app = mount(<BrowserRouter><MovieDetails onComponentReady={fakeCallback} onMoviesLoaded={fakeCallback} moviesList={movies} userBlock={{}} reviews={[]} /></BrowserRouter>);
  expect(app.find(`.movie-card__nav .movie-nav__link`)).to.have.lengthOf(3);
});
