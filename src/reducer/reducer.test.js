import MockAdapter from "axios-mock-adapter";
import {createApi} from "../api";
import {
  ActionType,
  reducer,
  Operation
} from "./data";

import {movies} from '../mocks/films.js';

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

it(`Should make a correct API call to /films`, () => {
  const dispatch = jest.fn();
  const api = createApi(dispatch);
  const mock = new MockAdapter(api);
  const loader = Operation.loadMovies();

  mock.onGet(`/films`).reply(200, [{fake: true}]);

  loader(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(1, {
      type: ActionType.LOAD_MOVIES,
      payload: [{fake: true}]
    });
  });
});
