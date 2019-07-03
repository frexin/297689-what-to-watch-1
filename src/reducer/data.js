import adapter from './../adapter.js';

const initialState = {
  currentGenre: `All genres`,
  currentMovie: null,
  promoMovie: null,
  moviesLimit: 20,
  hasMoreMovies: true,
  moviesList: [],
  favMoviesList: [],
  fullMoviesList: [],
  isAuthorizationRequired: false,
  userData: null,
  reviews: [],
  similarMovies: []
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_FAV_MOVIES: `LOAD_FAV_MOVIES`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_USER: `LOAD_USER`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_AUTH_REQUIRE: `CHANGE_AUTH_REQUIRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  GET_MOVIE_BY_ID: `GET_MOVIE_BY_ID`,
  EXTEND_MOVIES_LIMIT: `EXTEND_MOVIES_LIMIT`,
  REVIEW_CREATED: `REVIEW_CREATED`,
  TOGGLE_FAVORITE: `TOGGLE_FAVORITE`
};

const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
        .then((resp) => {
          const movies = adapter(resp.data);
          dispatch(ActionCreator.loadMovies(movies));
        });
  },
  loadPromo: () => (dispatch, _getState, api) => {
    return api.get(`/films/promo`)
        .then((resp) => {
          const movie = adapter(resp.data);
          dispatch(ActionCreator.loadPromo(movie));
        });
  },
  loadFavMovies: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
        .then((resp) => {
          const movies = adapter(resp.data);
          dispatch(ActionCreator.loadFavMovies(movies));
        });
  },
  auth: (userEmail, userPassword) => (dispatch, _getState, api) => {
    return api.post(`/login`, {email: userEmail, password: userPassword})
        .then((resp) => {
          const userData = adapter(resp.data);

          dispatch(ActionCreator.changeAuthRequire(false));
          dispatch(ActionCreator.loadUser(userData));
        });
  },
  toggleFavorite: (filmId, status) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${filmId}/${status}`)
        .then(() => {
          dispatch(ActionCreator.toggleFavorite(status));
        });
  },
  addReview: (filmId, userRating, userComment) => (dispatch, _getState, api) => {
    return api.post(`/comments/${filmId}`, {rating: userRating, comment: userComment})
        .then((resp) => {
          const comments = adapter(resp.data);

          dispatch(ActionCreator.loadReviews([comments, filmId]));
          dispatch(ActionCreator.reviewCreated());
        });
  },
  loadMovie: (filmId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${filmId}`)
        .then((resp) => {
          const reviews = resp.data;
          dispatch(ActionCreator.loadReviews([reviews, filmId]));
        });
  },
  checkAuth: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
        .then((resp) => {
          const userData = adapter(resp.data);

          dispatch(ActionCreator.changeAuthRequire(false));
          dispatch(ActionCreator.loadUser(userData));
        }).catch(() => {
          dispatch(ActionCreator.changeAuthRequire(true));
        });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {
        moviesList: action.moviesList.slice(0, state.moviesLimit),
        fullMoviesList: action.moviesList,
        hasMoreMovies: action.moviesList.length > state.moviesLimit
      });

    case ActionType.LOAD_FAV_MOVIES:
      return Object.assign({}, state, {
        favMoviesList: action.favMoviesList,
      });

    case ActionType.LOAD_PROMO:
      return Object.assign({}, state, {
        promoMovie: action.payload,
        currentMovie: action.payload,
      });

    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload[0],
        currentMovie: state.moviesList.filter((item) => item.id === action.payload[1])[0]
      });

    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload,
      });

    case ActionType.TOGGLE_FAVORITE:
      const updatedMovie = state.currentMovie;
      updatedMovie.isFavorite = action.payload;

      return Object.assign({}, state, {
        currentMovie: updatedMovie
      });

    case ActionType.GET_MOVIE_BY_ID:
      return Object.assign({}, state, {
        currentMovie: state.moviesList.filter((item) => item.id === action.payload)[0]
      });

    case ActionType.CHANGE_AUTH_REQUIRE:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });

    case ActionType.LOAD_USER:
      return Object.assign({}, state, {
        userData: action.payload
      });

    case ActionType.EXTEND_MOVIES_LIMIT:
      const newLimit = state.moviesLimit + 20;

      return Object.assign({}, state, {
        moviesLimit: newLimit,
        moviesList: state.fullMoviesList.slice(0, newLimit),
        hasMoreMovies: state.fullMoviesList.length > newLimit
      });
  }

  return state;
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      moviesList: movies
    };
  },
  loadFavMovies: (movies) => {
    return {
      type: ActionType.LOAD_FAV_MOVIES,
      favMoviesList: movies
    };
  },
  loadMovie: (id) => {
    return {
      type: ActionType.GET_MOVIE_BY_ID,
      payload: id
    };
  },
  loadPromo: (movie) => {
    return {
      type: ActionType.LOAD_PROMO,
      payload: movie
    };
  },
  reviewCreated: () => {
    return {
      type: ActionType.REVIEW_CREATED
    };
  },
  toggleFavorite: (status) => {
    return {
      type: ActionType.TOGGLE_FAVORITE,
      payload: status
    };
  },
  loadReviews: (data) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: data
    };
  },
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  extendLimit: () => ({
    type: ActionType.EXTEND_MOVIES_LIMIT
  }),
  changeAuthRequire: (authRequire) => ({
    type: ActionType.CHANGE_AUTH_REQUIRE,
    payload: authRequire
  }),
  loadUser: (userData) => ({
    type: ActionType.LOAD_USER,
    payload: userData
  }),
};

export {
  ActionCreator, ActionType, reducer, Operation
};
