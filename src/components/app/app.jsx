import {Route, Switch} from 'react-router-dom';
import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import React from "react";
import PropTypes from "prop-types";
import {Operation} from "../../reducer/data";
import {connect} from "react-redux";
import Favorites from "../favorites/favorites.jsx";
import withAuth from "../../hocs/with-auth.js";
import withLayout from "../../hocs/with-layout.js";
import withReviewForm from "../../hocs/with-review-form.js";
import withBigPlayer from "../../hocs/with-player.js";
import MovieDetails from "../movie-details/movie-details.jsx";
import AddReview from "../add-review/add-review.jsx";

const App = (props) => {

  return (
    <Switch>
      <Route exact path="/" component={withLayout(MainPage)} />
      <Route path="/login" render={() => <SignIn onFormSubmit={props.onFormSubmit} authRequire={props.authRequire} />} />
      <Route path="/mylist" component={withLayout(withAuth(Favorites))} />
      <Route exact path="/film/:id" component={withLayout(withBigPlayer(MovieDetails))} />
      <Route path="/films/:id/review" component={withLayout(withAuth(withReviewForm(AddReview)))} />
    </Switch>
  );
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  authRequire: state.isAuthorizationRequired,
  user: state.userData
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (email, password) => {
      dispatch(Operation.auth(email, password));
    }
  };
};

App.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  authRequire: PropTypes.bool.isRequired
};

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
