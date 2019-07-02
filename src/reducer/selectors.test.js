import {movies} from "../mocks/films";
import {getMoviesForGenre, getGenresList} from "./selectors";

const state = {
  moviesList: movies,
  currentGenre: `All genres`
};


it(`Selector should return all genres from movies list`, () => {
  const etalonGenres = [`All genres`, `Crime`, `Dramas`, `Horror`, `Romance`];

  expect(getGenresList(state)).toEqual(etalonGenres);
});

it(`Selector should return correct movies, filtered by genre`, () => {
  const moviesList = [{
    id: 1, name: `Bohemian Rhapsody`, previewImage: `bohemian-rhapsody.jpg`, genre: `Crime`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`, starring: []
  },
  {
    id: 3, name: `What We Do in the Shadows`, previewImage: `what-we-do-in-the-shadows.jpg`, genre: `Crime`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`, starring: []
  }];

  state.currentGenre = `Crime`;
  expect(getMoviesForGenre(state)).toEqual(moviesList);
});
