import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withActiveItem from './with-active-item.js';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`HOC should change state in order to respond for callback`, () => {
  const wrap = shallow(<MockComponentWrapped/>);

  wrap.instance().handleActiveItem(`test`);
  expect(wrap.state().activeItem).toEqual(`test`);
});
