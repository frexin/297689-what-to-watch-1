import React from "react";
import PropTypes from 'prop-types';

const withTabs = (Wrapped) => {
  class WithTabs extends React.PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        selectedIndex: 0
      };

      this.handleTabSelect = this.handleTabSelect.bind(this);
    }

    handleTabSelect(index, ev) {
      ev.preventDefault();
      this.setState({selectedIndex: index});
    }

    render() {
      return (<Wrapped selectedIndex={this.state.selectedIndex} onTabSelect={this.handleTabSelect} {...this.props} />);
    }
  }

  WithTabs.propTypes = {
    components: PropTypes.array.isRequired
  };

  return WithTabs;
};

export default withTabs;
