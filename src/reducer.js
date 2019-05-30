import {movies} from './mocks/films.js';

const initialState = {
  currentGenre: `All genres`,
  moviesList: []
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`
};

const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get('/films')
        .then(resp => {
          dispatch(ActionCreator.loadMovies(resp.data));
        });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {
        moviesList: action.payload
      });

    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload,
      });
  }
  return state;
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies
    }
  },
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  })
};

export {
  ActionCreator, ActionType, reducer, Operation
};
