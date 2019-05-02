import React from "react";
import ReactDOM from "react-dom";

import MainPage from './components/main-page.jsx';

ReactDOM.render(<MainPage movies={[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`]} />,
    document.getElementById(`root`));
