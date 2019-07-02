import React from 'react';
import Enzyme, {shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import Tabs from "./tabs.jsx";
import StubComponent from "../../mocks/stub";

Enzyme.configure({adapter: new Adapter()});

it(`Tabs component renders correctly and able to deal with item click`, () => {
  const components = [StubComponent, StubComponent, StubComponent];

  const app = shallow(<Tabs components={components}/>);
  const getTab = () => app.find(`.movie-nav__item`).at(1);

  getTab().find(`a`).simulate(`click`, {preventDefault: () => {}});

  expect(getTab().hasClass(`movie-nav__item--active`)).toBe(true);

  const state = app.state().selectedIndex;
  expect(state).toBe(1);
});
