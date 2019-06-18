import React from "react";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';


class SignIn extends React.PureComponent {

  render() {

    if (!this.props.authRequire) {
      return (<Redirect to="/" />)
    }

    return (
      <div className="sign-in user-page__content">
        <form action="#" onSubmit={this.props.onFormSubmit} className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" required />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" required />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};

export default SignIn;
