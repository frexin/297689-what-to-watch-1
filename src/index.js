import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";

import {reducer} from './reducer.js';
import {movies} from "./mocks/films.js";
import MainPage from './components/main-page.jsx';
import {Provider} from "react-redux";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}><MainPage movies={movies} /></Provider>,
    document.getElementById(`root`));
