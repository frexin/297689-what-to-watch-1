import {
  ActionType,
  reducer,
} from "./reducer";

import {movies} from './mocks/films.js';

it(`Reducer should filter movies by specific genre`, () => {
  expect(reducer({
    currentGenre: `All genres`,
    moviesList: movies
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: `Crime`
  })).toEqual({
    currentGenre: `All genres`,
    moviesList: [{
      id: 1, name: `Bohemian Rhapsody`, picture: `bohemian-rhapsody.jpg`, genre: `Crime`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: 3, name: `What We Do in the Shadows`, picture: `what-we-do-in-the-shadows.jpg`, genre: `Crime`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    }]
  });
});

it(`Reducer should change active genre`, () => {
  expect(reducer({
    currentGenre: `All genres`,
    moviesList: movies
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Horror`
  })).toEqual({
    currentGenre: `Horror`,
    moviesList: movies
  });
});
