import React from 'react';
import renderer from 'react-test-renderer';
import StubComponent from "../../mocks/stub.jsx";

import Tabs from "./tabs.jsx";

it(`Tabs component loads correctly`, () => {
  const components = [StubComponent, StubComponent, StubComponent];
  const tree = renderer.create(<Tabs components={components} />).toJSON();

  expect(tree).toMatchSnapshot();
});
