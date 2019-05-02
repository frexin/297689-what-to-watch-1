import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

it(`Main components loads correctly`, () => {
  const movies = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];
  const tree = renderer.create(<MainPage movies={movies} onTitleClick={jest.fn()} />).toJSON();

  expect(tree).toMatchSnapshot();
});
