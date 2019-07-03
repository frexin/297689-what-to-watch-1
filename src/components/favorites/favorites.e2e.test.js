import React from 'react';
import Enzyme, {mount} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import {movies} from "../../mocks/films.js";
import {MemoryRouter} from "react-router-dom";
import {Favorites} from "./favorites.jsx";


Enzyme.configure({adapter: new Adapter()});

it(`Favorites calls ready callback`, () => {
  const componentReady = jest.fn();
  mount(<MemoryRouter><Favorites favMoviesList={movies} onComponentReady={componentReady} /></MemoryRouter>);

  expect(componentReady).toHaveBeenCalled();
});
