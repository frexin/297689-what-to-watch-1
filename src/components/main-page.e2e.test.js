import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainPage from './main-page.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Main component renders correctly and able to deal with item click`, () => {
  const movies = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];
  const fakeClick = jest.fn();

  const app = shallow(<MainPage movies={movies} onTitleClick={fakeClick} />);

  const header = app.find(`a.small-movie-card__link`).first();
  header.simulate(`click`);

  expect(fakeClick).toHaveBeenCalledTimes(1);
});
