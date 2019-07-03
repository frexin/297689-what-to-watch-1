import React from "react";
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';


class SignIn extends React.PureComponent {

  handleFormSubmit(event) {
    event.preventDefault();

    const collection = event.target.elements;
    const email = collection.namedItem(`user-email`).value;
    const password = collection.namedItem(`user-password`).value;

    this.props.onFormSubmit(email, password);
  }

  render() {
    if (!this.props.authRequire) {
      return (<Redirect to="/"/>);
    }

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>
        <div className="sign-in user-page__content">
          <form action="#" onSubmit={(ev) => this.handleFormSubmit(ev)} className="sign-in__form">
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="text" placeholder="Email address" name="user-email" id="user-email" required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <Link to="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

SignIn.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  authRequire: PropTypes.bool
};

export default SignIn;

