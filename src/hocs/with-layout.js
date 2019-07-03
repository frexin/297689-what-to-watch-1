import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from 'recompose';
import PropTypes from "prop-types";

const withLayout = (Wrapped) => {
  class WithLayout extends React.PureComponent {

    constructor(props) {
      super(props);

      this.userBlock = null;
      this.footer = null;

      if (props.user) {
        this.userBlock = <div className="user-block__avatar">
          <img src={`https://es31-server.appspot.com/` + props.user.avatarUrl} alt="User avatar" width="63" height="63"/>
        </div>;
      } else {
        this.userBlock = <Link to="/login" className="user-block__link">Sign in</Link>;
      }

      this.footer = <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>;
    }

    render() {
      return (<Wrapped footer={this.footer} userBlock={this.userBlock} {...this.props} />);
    }
  }

  WithLayout.propTypes = {
    user: PropTypes.object
  };

  return WithLayout;
};


const mapStateToProps = (state) => {
  return {
    user: state.userData
  };
};

export default compose(connect(mapStateToProps), withLayout);
