import {movies} from './mocks/films.js';

const initialState = {
  currentGenre: `All genres`,
  moviesList: movies
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload,
      });

    case ActionType.GET_MOVIES_BY_GENRE:
      return Object.assign({}, state, {
        moviesList: initialState.moviesList.filter((movie) => {
          const genre = action.payload;
          if (genre === `All genres`) {
            return true;
          }

          return movie.genre === genre;
        })
      });
  }
  return state;
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  getMoviesByGenre: (genre) => ({
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: genre
  })
};

export {
  ActionCreator, ActionType, reducer
};
