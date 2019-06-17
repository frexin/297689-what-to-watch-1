import {Route, Switch} from 'react-router-dom';
import MainPage from './main-page.jsx';
import SignIn from './sign-in.jsx';
import React from "react";
import {getGenresList, getMoviesForGenre} from "../reducer/selectors";
import {ActionCreator, Operation} from "../reducer/data";
import {connect} from "react-redux";

const App = (props) => {

  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/login" render={() => <SignIn onFormSubmit={props.onFormSubmit} />} />
    </Switch>
  );
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  authRequire: state.isAuthorizationRequired,
  user: state.userData
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (event) => {
      event.preventDefault();

      let email = null;
      let password = null;

      for (let elem of event.target.elements) {
        if (elem.name === `user-email`) {
          email = elem.value;
        }

        if (elem.name === `user-password`) {
          password = elem.value;
        }
      }

      dispatch(Operation.auth(email, password));
    }
  };
};

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
