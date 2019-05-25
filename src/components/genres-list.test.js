import React from 'react';
import renderer from 'react-test-renderer';

import GenresList from "./genres-list";

it(`GenresList component loads correctly`, () => {
  const tree = renderer.create(<GenresList genres={[`All`]} onSelect={() => {}} activeItem={`All genres`} />).toJSON();

  expect(tree).toMatchSnapshot();
});
