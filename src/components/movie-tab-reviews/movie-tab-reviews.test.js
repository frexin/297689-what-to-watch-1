import React from 'react';
import renderer from 'react-test-renderer';
import {comments} from "../../mocks/reviews.js";

import MovieTabReviews from "./movie-tab-reviews.jsx";

it(`MovieTabReviews component loads correctly`, () => {
  const tree = renderer.create(<MovieTabReviews reviews={comments} />).toJSON();

  expect(tree).toMatchSnapshot();
});
