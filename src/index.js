import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";

import {reducer} from './reducer.js';
import {movies} from "./mocks/films.js";
import MainPage from './components/main-page.jsx';
import {Provider} from "react-redux";

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}><MainPage movies={movies} /></Provider>,
    document.getElementById(`root`));
