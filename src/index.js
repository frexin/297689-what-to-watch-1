import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {compose} from "recompose";

import {reducer, Operation} from './reducer/data.js';
import MainPage from './components/main-page.jsx';
import {Provider} from "react-redux";
import {createApi} from "./api.js";

const api = createApi();

const store = createStore(reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.dispatch(Operation.checkAuth());
store.dispatch(Operation.loadMovies());

ReactDOM.render(
    <Provider store={store}><MainPage /></Provider>,
    document.getElementById(`root`));
