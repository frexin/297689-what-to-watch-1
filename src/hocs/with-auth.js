import React from "react";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {compose} from 'recompose';

const withAuth = (Wrapped) => {

  function WithAuth(props) {
    if (props.authRequire) {
      return (<Redirect to="/" />);
    }

    return <Wrapped {...props} />;
  }

  WithAuth.propTypes = {
    authRequire: PropTypes.bool
  };

  return WithAuth;
};

const mapStateToProps = (state) => {
  return {
    authRequire: state.isAuthorizationRequired
  };
};

export default compose(connect(mapStateToProps), withAuth);
