import MockAdapter from "axios-mock-adapter";
import {createApi} from "../api";
import {
  ActionType,
  reducer,
  Operation
} from "./reducer";

import {movies} from '../mocks/films.js';
import {comments} from "../mocks/reviews.js";


it(`Reducer should load movies`, () => {
  expect(reducer({
    moviesLimit: 2
  }, {
    type: ActionType.LOAD_MOVIES,
    moviesList: movies,
  })).toEqual({
    moviesLimit: 2,
    moviesList: movies.slice(0, 2),
    hasMoreMovies: true,
    fullMoviesList: movies
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

it(`Reducer should load fav movies`, () => {
  expect(reducer({}, {
    type: ActionType.LOAD_FAV_MOVIES,
    favMoviesList: movies
  })).toEqual({
    favMoviesList: movies
  });
});

it(`Reducer should load promo`, () => {
  expect(reducer({}, {
    type: ActionType.LOAD_PROMO,
    payload: movies[0]
  })).toEqual({
    promoMovie: movies[0],
    currentMovie: movies[0],
  });
});

it(`Reducer should load reviews`, () => {
  expect(reducer({
    moviesList: movies
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: [comments, 1]
  })).toEqual({
    moviesList: movies,
    reviews: comments,
    currentMovie: movies[0],
  });
});

it(`Reducer should toggle fav`, () => {
  const film = movies[0];

  expect(reducer({
    currentMovie: film
  }, {
    type: ActionType.TOGGLE_FAVORITE,
    payload: 1
  })).toEqual({
    currentMovie: film
  });
});

it(`Reducer should get movie`, () => {
  const film = movies[0];

  expect(reducer({
    moviesList: movies
  }, {
    type: ActionType.GET_MOVIE_BY_ID,
    payload: 1
  })).toEqual({
    moviesList: movies,
    currentMovie: film
  });
});

it(`Reducer should change auth`, () => {
  expect(reducer({}, {
    type: ActionType.CHANGE_AUTH_REQUIRE,
    payload: false
  })).toEqual({
    isAuthorizationRequired: false
  });
});

it(`Reducer should load user`, () => {
  expect(reducer({}, {
    type: ActionType.LOAD_USER,
    payload: `user`
  })).toEqual({
    userData: `user`
  });
});

it(`Reducer should extend movies list`, () => {
  expect(reducer({
    moviesLimit: 1,
    fullMoviesList: movies
  }, {
    type: ActionType.EXTEND_MOVIES_LIMIT,
  })).toEqual({
    moviesLimit: 21,
    fullMoviesList: movies,
    moviesList: movies,
    hasMoreMovies: false
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
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.LOAD_MOVIES,
      moviesList: [{fake: true}]
    });
  });
});

it(`Should make a correct POST call to /login`, () => {
  const dispatch = jest.fn();
  const api = createApi(dispatch);
  const mock = new MockAdapter(api);
  const loader = Operation.auth(`user@user.com`, `qwerty`);

  mock.onPost(`/login`).reply(200, [{fake: true}]);

  loader(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: ActionType.LOAD_USER,
      payload: [{fake: true}]
    });
  });
});

it(`Should make a correct GET call to /login`, () => {
  const dispatch = jest.fn();
  const api = createApi(dispatch);
  const mock = new MockAdapter(api);
  const loader = Operation.checkAuth();

  mock.onGet(`/login`).reply(200, [{fake: true}]);

  loader(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: ActionType.LOAD_USER,
      payload: [{fake: true}]
    });
  });
});

it(`Should make a fail GET call to /login`, () => {
  const dispatch = jest.fn();
  const api = createApi(dispatch);
  const mock = new MockAdapter(api);
  const loader = Operation.checkAuth();

  mock.onGet(`/login`).reply(403, [{fake: true}]);

  loader(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: ActionType.CHANGE_AUTH_REQUIRE,
      payload: true
    });
  });
});
