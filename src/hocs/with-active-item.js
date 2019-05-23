import React from "react";
import PropTypes from 'prop-types';

const withActiveItem = (Wrapped) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem
      };

      this.changeActiveItem = this.changeActiveItem.bind(this);
    }

    changeActiveItem(item) {
      this.setState({activeItem: item});

      if (this.props.onSelect) {
        this.props.onSelect(item);
      }
    }

    render() {
      return (<Wrapped activeItem={this.state.activeItem} onSelect={this.state.changeActiveItem} {...this.props} />);
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.string,
    onSelect: PropTypes.func
  };

  return WithActiveItem;
};

export default withActiveItem;
