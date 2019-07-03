import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {Router} from "react-router-dom";

import {reducer, Operation} from './reducer/reducer.js';
import App from './components/app/app.jsx';
import {Provider} from "react-redux";
import {createApi} from "./api.js";
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

const api = createApi(() => history.push(`/login`));

const store = createStore(reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.dispatch(Operation.checkAuth());
store.dispatch(Operation.loadMovies());
store.dispatch(Operation.loadPromo());

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById(`root`));
