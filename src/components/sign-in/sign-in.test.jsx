import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";

import SignIn from "./sign-in";

it(`SignIn component loads correctly`, () => {
  const tree = renderer.create(<BrowserRouter><SignIn onFormSubmit={jest.fn()} /></BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
