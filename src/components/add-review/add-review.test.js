import React from 'react';
import renderer from 'react-test-renderer';
import AddReview from './add-review.jsx';
import {movie} from "../../mocks/movie.js";
import {MemoryRouter} from "react-router-dom";

it(`Main component shows default page`, () => {
  const tree = renderer.create(<MemoryRouter><AddReview user={{avatarUrl: `dsd`}} movie={movie} handleFormSubmit={jest.fn()} isValid={false} /> </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
