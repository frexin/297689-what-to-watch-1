import React from 'react';
import renderer from 'react-test-renderer';

import ShowMoreBtn from "./show-more-btn";

it(`Button component loads correctly`, () => {
  const tree = renderer.create(<ShowMoreBtn onLoadMore={jest.fn()} showBtn={true} />).toJSON();

  expect(tree).toMatchSnapshot();
});
