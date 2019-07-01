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

      if (props.user) {
        this.userBlock = <div className="user-block__avatar">
          <img src={`https://es31-server.appspot.com/` + props.user.avatarUrl} alt="User avatar" width="63" height="63"/>
        </div>;
      } else {
        this.userBlock = <Link to="/login" className="user-block__link">Sign in</Link>;
      }
    }

    render() {
      return (<Wrapped userBlock={this.userBlock} {...this.props} />);
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
