import React from 'react';
import Enzyme, {shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import ShowMoreBtn from "./show-more-btn";

Enzyme.configure({adapter: new Adapter()});

it(`ShowMoreBtn component renders correctly and able to deal with mouse click`, () => {
  const fn = jest.fn();
  const app = shallow(<ShowMoreBtn onLoadMore={fn} showBtn={true} />);

  app.find(`button`).simulate(`click`);
  expect(fn).toHaveBeenCalled();
});
