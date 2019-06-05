import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from "./sign-in";

it(`SignIn component loads correctly`, () => {
  const tree = renderer.create(<SignIn onFormSubmit={jest.fn()} />).toJSON();

  expect(tree).toMatchSnapshot();
});
