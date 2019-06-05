import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from "./sign-in";

Enzyme.configure({adapter: new Adapter()});

it(`SignIn component renders correctly and able to deal with form submit`, () => {
  const fakeSubmit = jest.fn();

  const app = shallow(<SignIn onFormSubmit={fakeSubmit} />);
  app.find(`#user-email`).simulate(`change`, {target: {value: `user@test.com`}});
  app.find(`#user-password`).simulate(`change`, {target: {value: `qwerty`}});

  app.find(`form`).simulate(`submit`);

  expect(fakeSubmit).toHaveBeenCalled();
});
