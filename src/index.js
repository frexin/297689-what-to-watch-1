import React from "react";
import ReactDOM from "react-dom";

import {movies} from "./mocks/films.js";
import MainPage from './components/main-page.jsx';

ReactDOM.render(<MainPage movies={movies} />,
    document.getElementById(`root`));
